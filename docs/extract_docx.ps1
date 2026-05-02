$ErrorActionPreference = 'Stop'
$xml = [xml](Get-Content -Raw -Encoding UTF8 -Path 'C:\Users\SAMSUNG\Downloads\_vpp_docx_extract\word\document.xml')
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace('w','http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$paras = $xml.SelectNodes('//w:p',$ns)
Write-Output ('Paragraphs: ' + $paras.Count)
$i = 0
$lines = @()
foreach ($p in $paras) {
    $texts = $p.SelectNodes('.//w:t',$ns) | ForEach-Object { $_.InnerText }
    $line = ($texts -join '')
    $lines += ('[' + $i + '] ' + $line)
    $i++
}
$lines | Out-File -FilePath 'C:\60hz\00.Claude\docs\vpp_docx_dump.txt' -Encoding UTF8
Write-Output 'DONE'
