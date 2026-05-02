$ErrorActionPreference = 'Stop'
Import-Module ImportExcel

$out = 'C:\60hz\00.Claude\docs\VPP_Event_Model_v0.1_OpenADR_Review.xlsx'
$json = Get-Content -Raw -Encoding UTF8 -Path 'C:\60hz\00.Claude\docs\vpp_review_sheet6.json'
$data = $json | ConvertFrom-Json

# Remove existing sheet if present (idempotent)
$existing = Get-ExcelSheetInfo -Path $out | Where-Object { $_.Name -eq 'VerificationDetail' }
if ($existing) { Remove-Worksheet -Path $out -WorksheetName 'VerificationDetail' }

$data.verification | Export-Excel -Path $out `
    -WorksheetName 'VerificationDetail' `
    -AutoSize -BoldTopRow -FreezeTopRow `
    -TableName 'VerificationDetail' -TableStyle Medium2

Write-Output ('UPDATED: ' + $out)
Get-ExcelSheetInfo -Path $out | Select-Object Index, Name | Format-Table -AutoSize
