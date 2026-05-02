$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$pathsJson = Get-Content -Raw -Encoding UTF8 -Path 'C:\60hz\00.Claude\docs\vpp_docx_paths.json'
$P = $pathsJson | ConvertFrom-Json

$srcDocx    = $P.srcDocx
$backupDocx = $P.backupDocx
$workDir    = $P.workDir
$dstDocx    = $P.dstDocx
$inlineJson = 'C:\60hz\00.Claude\docs\vpp_inline_edits.json'
$sec13Json  = 'C:\60hz\00.Claude\docs\vpp_section13_v3.json'
$xmlPath    = Join-Path $workDir 'word\document.xml'

if (-not (Test-Path -LiteralPath $backupDocx)) { throw 'Backup not found' }

if (Test-Path -LiteralPath $workDir) { Remove-Item -LiteralPath $workDir -Recurse -Force }
[void](New-Item -ItemType Directory -Path $workDir)
[System.IO.Compression.ZipFile]::ExtractToDirectory($backupDocx, $workDir)
Write-Output 'EXTRACTED from backup'

$xml = New-Object System.Xml.XmlDocument
$xml.PreserveWhitespace = $true
$xml.Load($xmlPath)

$wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace('w', $wNs)

$body = $xml.SelectSingleNode('//w:body', $ns)
$paras = $xml.SelectNodes('//w:body//w:p', $ns)
Write-Output ('Total paragraphs (pre-edit): ' + $paras.Count)

# ---- Inline edits (no color: kept black for clean v0.2) ----
function Replace-ParagraphText {
    param(
        [System.Xml.XmlElement]$Para,
        [string]$NewText,
        [System.Xml.XmlNamespaceManager]$Ns
    )
    $textEsc = [System.Security.SecurityElement]::Escape($NewText)
    $wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    $pPr = $Para.SelectSingleNode('w:pPr', $Ns)
    $children = @($Para.ChildNodes)
    foreach ($c in $children) { [void]$Para.RemoveChild($c) }
    if ($pPr) { [void]$Para.AppendChild($pPr) }
    $runXml = "<w:r xmlns:w='$wNs'><w:t xml:space='preserve'>$textEsc</w:t></w:r>"
    $frag = $Para.OwnerDocument.CreateDocumentFragment()
    $frag.InnerXml = $runXml
    [void]$Para.AppendChild($frag)
}

$inlineData = (Get-Content -Raw -Encoding UTF8 -Path $inlineJson) | ConvertFrom-Json
$editCount = 0
foreach ($edit in $inlineData.edits) {
    $idx = [int]$edit.index
    if ($idx -lt 0 -or $idx -ge $paras.Count) { continue }
    Replace-ParagraphText -Para $paras[$idx] -NewText ([string]$edit.newText) -Ns $ns
    $editCount++
}
Write-Output ('INLINE EDITS APPLIED (black): ' + $editCount)

# ---- Section 13 builder ----
$sectPr = $body.SelectSingleNode('w:sectPr', $ns)
$S = (Get-Content -Raw -Encoding UTF8 -Path $sec13Json) | ConvertFrom-Json

function New-Para {
    param([System.Xml.XmlDocument]$Doc, [string]$Text, [bool]$IsHeading = $false, [bool]$Red = $false)
    $wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    $textEsc = [System.Security.SecurityElement]::Escape($Text)
    $rprParts = @()
    if ($IsHeading) { $rprParts += '<w:b/>'; $rprParts += "<w:sz w:val='28'/>" }
    if ($Red)       { $rprParts += "<w:color w:val='FF0000'/>" }
    if ($rprParts.Count -gt 0) { $rPrXml = '<w:rPr>' + ($rprParts -join '') + '</w:rPr>' } else { $rPrXml = '' }
    $pXml = "<w:p xmlns:w='$wNs'><w:r>$rPrXml<w:t xml:space='preserve'>$textEsc</w:t></w:r></w:p>"
    $frag = $Doc.CreateDocumentFragment()
    $frag.InnerXml = $pXml
    return $frag
}

function New-Table {
    param([System.Xml.XmlDocument]$Doc, $Headers, $Rows, $ColWidths)
    $wNs = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append("<w:tbl xmlns:w='$wNs'>")
    [void]$sb.Append("<w:tblPr><w:tblW w:w='5000' w:type='pct'/><w:tblBorders>")
    [void]$sb.Append("<w:top w:val='single' w:sz='4' w:space='0' w:color='auto'/>")
    [void]$sb.Append("<w:left w:val='single' w:sz='4' w:space='0' w:color='auto'/>")
    [void]$sb.Append("<w:bottom w:val='single' w:sz='4' w:space='0' w:color='auto'/>")
    [void]$sb.Append("<w:right w:val='single' w:sz='4' w:space='0' w:color='auto'/>")
    [void]$sb.Append("<w:insideH w:val='single' w:sz='4' w:space='0' w:color='auto'/>")
    [void]$sb.Append("<w:insideV w:val='single' w:sz='4' w:space='0' w:color='auto'/>")
    [void]$sb.Append("</w:tblBorders><w:tblLook w:val='04A0'/></w:tblPr>")

    [void]$sb.Append("<w:tblGrid>")
    foreach ($w in $ColWidths) { [void]$sb.Append("<w:gridCol w:w='$w'/>") }
    [void]$sb.Append("</w:tblGrid>")

    [void]$sb.Append("<w:tr><w:trPr><w:tblHeader/></w:trPr>")
    for ($i = 0; $i -lt $Headers.Count; $i++) {
        $w = $ColWidths[$i]
        $hdr = [System.Security.SecurityElement]::Escape([string]$Headers[$i])
        [void]$sb.Append("<w:tc><w:tcPr><w:tcW w:w='$w' w:type='dxa'/><w:shd w:val='clear' w:color='auto' w:fill='F2F2F2'/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t xml:space='preserve'>$hdr</w:t></w:r></w:p></w:tc>")
    }
    [void]$sb.Append("</w:tr>")

    foreach ($row in $Rows) {
        [void]$sb.Append("<w:tr>")
        for ($i = 0; $i -lt $row.Count; $i++) {
            $w = $ColWidths[$i]
            $cell = [System.Security.SecurityElement]::Escape([string]$row[$i])
            [void]$sb.Append("<w:tc><w:tcPr><w:tcW w:w='$w' w:type='dxa'/></w:tcPr><w:p><w:r><w:t xml:space='preserve'>$cell</w:t></w:r></w:p></w:tc>")
        }
        [void]$sb.Append("</w:tr>")
    }
    [void]$sb.Append("</w:tbl>")

    $frag = $Doc.CreateDocumentFragment()
    $frag.InnerXml = $sb.ToString()
    return $frag
}

# Build section 13
[void]$body.InsertBefore((New-Para -Doc $xml -Text ''), $sectPr)
[void]$body.InsertBefore((New-Para -Doc $xml -Text $S.header.title -IsHeading $true -Red $true), $sectPr)
[void]$body.InsertBefore((New-Para -Doc $xml -Text $S.header.subtitle -Red $true), $sectPr)
[void]$body.InsertBefore((New-Para -Doc $xml -Text ''), $sectPr)

[void]$body.InsertBefore((New-Para -Doc $xml -Text $S.sec131.heading -IsHeading $true -Red $true), $sectPr)
[void]$body.InsertBefore((New-Para -Doc $xml -Text $S.sec131.body), $sectPr)
[void]$body.InsertBefore((New-Para -Doc $xml -Text ''), $sectPr)

[void]$body.InsertBefore((New-Para -Doc $xml -Text $S.sec132.heading -IsHeading $true -Red $true), $sectPr)
[void]$body.InsertBefore((New-Table -Doc $xml -Headers $S.sec132.headers -Rows $S.sec132.rows -ColWidths $S.sec132.widths), $sectPr)
[void]$body.InsertBefore((New-Para -Doc $xml -Text ''), $sectPr)

[void]$body.InsertBefore((New-Para -Doc $xml -Text $S.sec133.heading -IsHeading $true -Red $true), $sectPr)
[void]$body.InsertBefore((New-Table -Doc $xml -Headers $S.sec133.headers -Rows $S.sec133.rows -ColWidths $S.sec133.widths), $sectPr)
[void]$body.InsertBefore((New-Para -Doc $xml -Text ''), $sectPr)

[void]$body.InsertBefore((New-Para -Doc $xml -Text $S.sec134.heading -IsHeading $true -Red $true), $sectPr)
[void]$body.InsertBefore((New-Table -Doc $xml -Headers $S.sec134.headers -Rows $S.sec134.rows -ColWidths $S.sec134.widths), $sectPr)
[void]$body.InsertBefore((New-Para -Doc $xml -Text ''), $sectPr)

[void]$body.InsertBefore((New-Para -Doc $xml -Text $S.sec135.heading -IsHeading $true -Red $true), $sectPr)
foreach ($item in $S.sec135.items) {
    [void]$body.InsertBefore((New-Para -Doc $xml -Text $item), $sectPr)
}
[void]$body.InsertBefore((New-Para -Doc $xml -Text ''), $sectPr)

Write-Output 'SECTION 13 ASSEMBLED'

$utf8 = New-Object System.Text.UTF8Encoding($false)
$ws = New-Object System.Xml.XmlWriterSettings
$ws.Encoding = $utf8
$ws.Indent = $false
$ws.OmitXmlDeclaration = $false
$writer = [System.Xml.XmlWriter]::Create($xmlPath, $ws)
try { $xml.Save($writer) } finally { $writer.Close() }
Write-Output 'XML SAVED'

if (Test-Path -LiteralPath $dstDocx) { Remove-Item -LiteralPath $dstDocx -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory($workDir, $dstDocx, [System.IO.Compression.CompressionLevel]::Optimal, $false)
Write-Output 'PACKAGED'

Get-Item -LiteralPath $dstDocx | Select-Object Name, Length, LastWriteTime
