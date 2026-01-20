<?php
header('Content-Type: application/json');

$memInfo = shell_exec("free -m | awk 'NR==2{print $3,$2}'");
$memParts = explode(' ', trim($memInfo));
$usedMemoryMB = isset($memParts[0]) ? (int)$memParts[0] : 0;
$totalMemoryMB = isset($memParts[1]) ? (int)$memParts[1] : 0;
$usedMemoryGB = $totalMemoryMB > 0 ? number_format($usedMemoryMB / 1024, 2) : 0;
$totalMemoryGB = $totalMemoryMB > 0 ? number_format($totalMemoryMB / 1024, 2) : 0;

$cpuLoad = sys_getloadavg();
$cpuLoadFormatted = [
    '1 min' => number_format($cpuLoad[0], 2),
    '5 min' => number_format($cpuLoad[1], 2),
    '15 min' => number_format($cpuLoad[2], 2)
];

$uptime = shell_exec("uptime -p");

$hostname = gethostname();
$kernelVersion = trim(shell_exec("uname -r"));
$distro = trim(shell_exec("awk -F= '/PRETTY_NAME/{print $2}' /etc/os-release"));

echo json_encode([
    'memory' => "$usedMemoryGB/$totalMemoryGB GB",
    'cpuLoad' => $cpuLoadFormatted,
    'uptime' => trim($uptime),
    'hostname' => $hostname,
    'kernelVersion' => $kernelVersion,
    'distro' => str_replace('"', '', $distro)
]);
