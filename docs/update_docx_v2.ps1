$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$pathsJson = Get-Content -Raw -Encoding UTF8 -Path 'C:\60hz\00.Claude\docs\vpp_docx_paths.json'
$P = $pathsJson | ConvertFrom-Json

$srcDocx        = $P.srcDocx
$backupDocx     = $P.backupDocx
$workDir        = $P.workDir
$dstDocx        = $P.dstDocx
$supplementJson = $P.supplementJson
$inlineJson     = 'C:\60hz\00.Claude\docs\vpp_inline_edits.json'
$xmlPath        = Join-Path $workDir 'word\document.xml'

# 1) Backup (idempotent)
if (-not (Test-Path -LiteralPath $backupDocx)) {
    Copy-Item -LiteralPath $srcDocx -Destination $backupDocx -Force
    Write-Output 'BACKUP created'
} else {
    Write-Output 'BACKUP exists'
}

# 2) Re-extract from backup (clean v0.1 state)
if (Test-Path -LiteralPath $workDir) { Remove-Item -LiteralPath $workDir -Recurse -Force }
[void](New-Item -ItemType Directory -Path $workDir)
[System.IO.Compression.ZipFile]::ExtractToDirectory($backupDocx, $workDir)
Write-Output 'EXTRACTED from backup'

# 3) Load document.xml
$xml = New-Object System.Xml.XmlDocument
$xml.PreserveWhitespace = $true
$xml.Load($xmlPath)

$wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace('w', $wNs)

$body = $xml.SelectSingleNode('//w:body', $ns)
if (-not $body) { throw 'w:body not found' }
$sectPr = $body.SelectSingleNode('w:sectPr', $ns)

# Get all paragraphs in document order (for index-based addressing)
$paras = $xml.SelectNodes('//w:body//w:p', $ns)
Write-Output ('Total paragraphs (pre-edit): ' + $paras.Count)

# 4) Apply inline edits
$inlineData = (Get-Content -Raw -Encoding UTF8 -Path $inlineJson) | ConvertFrom-Json

function Replace-ParagraphText {
    param(
        [System.Xml.XmlElement]$Para,
        [string]$NewText,
        [System.Xml.XmlNamespaceManager]$Ns
    )
    $textEsc = [System.Security.SecurityElement]::Escape($NewText)
    $wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

    # Preserve existing pPr (paragraph properties) if any
    $pPr = $Para.SelectSingleNode('w:pPr', $Ns)

    # Remove all existing children
    $children = @($Para.ChildNodes)
    foreach ($c in $children) { [void]$Para.RemoveChild($c) }

    # Re-append pPr if it existed
    if ($pPr) { [void]$Para.AppendChild($pPr) }

    # Build new run with red color
    $runXml = "<w:r xmlns:w='$wNs'><w:rPr><w:color w:val='FF0000'/></w:rPr><w:t xml:space='preserve'>$textEsc</w:t></w:r>"
    $frag = $Para.OwnerDocument.CreateDocumentFragment()
    $frag.InnerXml = $runXml
    [void]$Para.AppendChild($frag)
}

$editCount = 0
foreach ($edit in $inlineData.edits) {
    $idx = [int]$edit.index
    if ($idx -lt 0 -or $idx -ge $paras.Count) {
        Write-Output ("SKIP index out of range: " + $idx)
        continue
    }
    $para = $paras[$idx]
    Replace-ParagraphText -Para $para -NewText ([string]$edit.newText) -Ns $ns
    $editCount++
}
Write-Output ('INLINE EDITS APPLIED: ' + $editCount)

# 5) Append supplement (Section 13) — re-read sectPr in case structure changed
$body = $xml.SelectSingleNode('//w:body', $ns)
$sectPr = $body.SelectSingleNode('w:sectPr', $ns)

function New-WordParagraph {
    param(
        [System.Xml.XmlDocument]$Doc,
        [string]$Text,
        [bool]$IsHeading
    )
    $wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    $textEsc = [System.Security.SecurityElement]::Escape($Text)
    $colorXml = "<w:color w:val='FF0000'/>"
    if ($IsHeading) {
        $rPrXml = "<w:rPr><w:b/><w:sz w:val='28'/>$colorXml</w:rPr>"
    } else {
        $rPrXml = "<w:rPr>$colorXml</w:rPr>"
    }
    $pXml = "<w:p xmlns:w='$wNs'><w:r>$rPrXml<w:t xml:space='preserve'>$textEsc</w:t></w:r></w:p>"
    $frag = $Doc.CreateDocumentFragment()
    $frag.InnerXml = $pXml
    return $frag
}

$supplement = (Get-Content -Raw -Encoding UTF8 -Path $supplementJson) | ConvertFrom-Json
$appendCount = 0
foreach ($p in $supplement.paragraphs) {
    $isHeading = [bool]$p.heading
    $frag = New-WordParagraph -Doc $xml -Text ([string]$p.text) -IsHeading $isHeading
    if ($sectPr) { [void]$body.InsertBefore($frag, $sectPr) }
    else         { [void]$body.AppendChild($frag) }
    $appendCount++
}
Write-Output ('SUPPLEMENT PARAGRAPHS APPENDED: ' + $appendCount)

# 6) Save XML
$utf8 = New-Object System.Text.UTF8Encoding($false)
$ws = New-Object System.Xml.XmlWriterSettings
$ws.Encoding = $utf8
$ws.Indent = $false
$ws.OmitXmlDeclaration = $false
$writer = [System.Xml.XmlWriter]::Create($xmlPath, $ws)
try { $xml.Save($writer) } finally { $writer.Close() }
Write-Output 'XML SAVED'

# 7) Re-zip into docx
if (Test-Path -LiteralPath $dstDocx) { Remove-Item -LiteralPath $dstDocx -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory($workDir, $dstDocx, [System.IO.Compression.CompressionLevel]::Optimal, $false)
Write-Output 'PACKAGED'

Get-Item -LiteralPath $dstDocx | Select-Object Name, Length, LastWriteTime
