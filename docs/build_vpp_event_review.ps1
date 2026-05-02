$ErrorActionPreference = 'Stop'
Import-Module ImportExcel

$json = Get-Content -Raw -Encoding UTF8 -Path 'C:\60hz\00.Claude\docs\vpp_review_data.json'
$data = $json | ConvertFrom-Json

$out = 'C:\60hz\00.Claude\docs\VPP_Event_Model_v0.1_OpenADR_Review.xlsx'
if (Test-Path $out) { Remove-Item $out -Force }

$data.meta     | Export-Excel -Path $out -WorksheetName 'Meta'             -AutoSize -BoldTopRow -TableName 'Meta'        -TableStyle Medium2
$data.summary  | Export-Excel -Path $out -WorksheetName 'Recommendations'  -AutoSize -BoldTopRow -FreezeTopRow -TableName 'Recommendations' -TableStyle Medium2
$data.dispatch | Export-Excel -Path $out -WorksheetName 'DispatchMapping'  -AutoSize -BoldTopRow -FreezeTopRow -TableName 'DispatchMapping' -TableStyle Medium2
$data.status   | Export-Excel -Path $out -WorksheetName 'StatusMapping'    -AutoSize -BoldTopRow -FreezeTopRow -TableName 'StatusMapping'   -TableStyle Medium2
$data.matrix   | Export-Excel -Path $out -WorksheetName 'ConformanceMatrix' -AutoSize -BoldTopRow -FreezeTopRow -TableName 'ConformanceMatrix' -TableStyle Medium2

Write-Output ('DONE: ' + $out)
Get-Item $out | Select-Object FullName, Length, LastWriteTime
