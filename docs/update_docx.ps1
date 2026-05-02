$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

# Load all paths from UTF-8 JSON to avoid script encoding issues with non-ASCII
$pathsJson = Get-Content -Raw -Encoding UTF8 -Path 'C:\60hz\00.Claude\docs\vpp_docx_paths.json'
$P = $pathsJson | ConvertFrom-Json

$srcDocx        = $P.srcDocx
$backupDocx     = $P.backupDocx
$workDir        = $P.workDir
$dstDocx        = $P.dstDocx
$supplementJson = $P.supplementJson
$xmlPath        = Join-Path $workDir 'word\document.xml'

# 1) Backup original (only if not already backed up)
if (-not (Test-Path -LiteralPath $backupDocx)) {
    Copy-Item -LiteralPath $srcDocx -Destination $backupDocx -Force
    Write-Output 'BACKUP created'
} else {
    Write-Output 'BACKUP exists'
}

# 2) Re-extract fresh copy of the original to working dir
if (Test-Path -LiteralPath $workDir) { Remove-Item -LiteralPath $workDir -Recurse -Force }
[void](New-Item -ItemType Directory -Path $workDir)
[System.IO.Compression.ZipFile]::ExtractToDirectory($backupDocx, $workDir)
Write-Output 'EXTRACTED'

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

# 4) Load supplement JSON
$json = Get-Content -Raw -Encoding UTF8 -Path $supplementJson
$supplement = $json | ConvertFrom-Json

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

# 5) Insert supplement paragraphs before sectPr (or append)
$count = 0
foreach ($para in $supplement.paragraphs) {
    $isHeading = [bool]$para.heading
    $frag = New-WordParagraph -Doc $xml -Text ([string]$para.text) -IsHeading $isHeading
    if ($sectPr) {
        [void]$body.InsertBefore($frag, $sectPr)
    } else {
        [void]$body.AppendChild($frag)
    }
    $count++
}
Write-Output ('PARAGRAPHS APPENDED: ' + $count)

# 6) Save document.xml
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
