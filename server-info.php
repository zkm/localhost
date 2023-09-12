<?php
header('Content-Type: application/json');

$memory = shell_exec("free -m | awk 'NR==2{printf \"%s/%sMB (%.2f%%)\", $3,$2,$3*100/$2 }'");
list($usedMemoryMB, $totalMemoryMB) = explode('/', trim($memory));
$usedMemoryGB = number_format($usedMemoryMB / 1024, 2);
$totalMemoryGB = number_format($totalMemoryMB / 1024, 2);

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
    'distro' => str_replace('"', '', $distro)  // Remove quotation marks around the distro name
]);
