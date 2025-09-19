# Creamos el payload para que ejecute un script que simula una acción maliciosa
# Simplemente escribimos en un log "You have been hacked!" con la fecha y hora actual
$logPath = "C:/you-have-been-hacked/hacked-log.txt"
Add-Content -Path $logPath -Value "You have been hacked! - $(Get-Date)"