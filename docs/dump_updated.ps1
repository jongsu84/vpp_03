$ErrorActionPreference = 'Stop'
$xml = New-Object System.Xml.XmlDocument
$xml.PreserveWhitespace = $true
$xml.Load('C:\tmp\vpp_verify\word\document.xml')
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace('w','http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$paras = $xml.SelectNodes('//w:p',$ns)
Write-Output ('Total paragraphs: ' + $paras.Count)
$lines = @()
$i = 0
foreach ($p in $paras) {
    $tn = $p.SelectNodes('.//w:t',$ns)
    $line = ''
    foreach ($t in $tn) { $line += $t.InnerText }
    $lines += ('[' + $i + '] ' + $line)
    $i++
}
$lines | Out-File -FilePath 'C:\60hz\00.Claude\docs\vpp_docx_updated_dump.txt' -Encoding UTF8
Write-Output 'DONE'
