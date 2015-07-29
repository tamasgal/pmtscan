// Module
var pmtScan = angular.module('pmtScan', []);

/*

Example output:

3.4.2.3/HAMA-R12199/2.13608 A10723388
3.4.2.3/HAMA-R12199/2.13614 A10722703
3.4.2.3/HAMA-R12199/2.13615 A10723081
3.4.2.3/HAMA-R12199/2.13616 A10724522
3.4.2.3/HAMA-R12199/2.13607 A10723590
3.4.2.3/HAMA-R12199/2.13605 A10723417
3.4.2.3/HAMA-R12199/2.13612 A10723513
3.4.2.3/HAMA-R12199/2.13611 A10723595

*/

pmtScan.controller('scanController', ['$scope', function ($scope) {

    $scope.log = "";
    $scope.what_to_scan = 'PMT'

    $scope.scan_status = function() {
        var code = $scope.code;
        var what_to_scan = $scope.what_to_scan;
        var n = $scope.log.split(/\r\n|\r|\n/).length

        if(code == undefined) {
            return { 'code': 'ready', 'message': 'Ready to scan ' + what_to_scan + ' #' + n };
        }
        // Check for board code
        if(/^[A-Z][0-9]{8}$/.test(code) && what_to_scan === 'board') {
            if($scope.log.indexOf(code) == -1) {
                $scope.log += ' ' + code + "\n";
                $scope.code = undefined;
                $scope.what_to_scan = 'PMT';
            }
            return { 'code': 'ok', 'message': 'Valid PMT code.' };
        }
        // Check for PMT code
        if(/3\.4\.2\.3\/.{11}\/[0-9]\.[0-9]{5}/.test(code) && what_to_scan === 'PMT') {
            if($scope.log.indexOf(code) == -1) {
                $scope.log += code;
                $scope.code = undefined;
                $scope.what_to_scan = 'board';
            }
            return { 'code': 'ok', 'message': 'Valid board code.' };
        }
        return { 'code': 'waiting', 'message': 'Waiting for valid ' + what_to_scan + ' code...' };
    };


}]);
