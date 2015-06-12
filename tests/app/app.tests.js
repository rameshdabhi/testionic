describe('Controllers', function(){
    var scope, httpBackend,http;

    // load the controller's module
    beforeEach(module('app'));
    // beforeEach(module('billingData'));

    beforeEach(inject(function($rootScope, $controller, $httpBackend,$http) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        http = $http;
        $controller('billingCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have billingData list', function(){
        // expect(scope.billingData).toBeDefined();
        scope.billingData.should.be.defined;
    });

    it('should have billingData with 5 items without using httpBackend', function(done){

        // console.log(http.get('http://192.168.1.105:3000/api/testbillings/initApp').success.toString());


        scope.$apply(function () {
            var ret;
            http.get("http://192.168.1.105:3000/api/testbillings/initApp")
                .success(function (data, status, headers, config) {
                    console.log(data);
                             ret = data;
                         })
                .error(function (data, status, headers, config) {
                    console.log("error: ",data);
                           ret = data;
                       });
            console.log('ret = ' + ret);
            
            expect(scope.billingData.length).to.equal(5);    
            done();
        });



        // http.get('http://192.168.1.105:3000/api/testbillings/initApp')
        //     .success(function(data){
        //         console.log("got success data");
        //         console.log(data);
        //         scope.billingData = data.initApp.billDimensions;
        //         console.log("set data to array");
        //         // expect(scope.billingData.length).toEqual(5);    
        //         expect(scope.billingData.length).to.equal(5);    
        //     })
        //     .error(function(data){
        //         console.log("error occured: %s",err);
        //         expect(scope.billingData.length).to.equal(5);    
        //     })
        //     .finally(function(data){
        //         done();
        //     });
    });

    it('should have billingData with 5 items', function(done){
        // console.log(httpBackend.toString());

        var billResponse = ['lol'];
        httpBackend
            .whenGET('http://192.168.1.105:3000/api/testbillings/initApp')
            .respond(billResponse);

        http.get('http://192.168.1.105:3000/api/testbillings/initApp')
            .success(function(data){
                console.log("got success data");
                console.log(data);
                scope.billingData = data.initApp.billDimensions;
                console.log("set data to array");
            })
            .error(function(data){
                console.log("error occured: %s",err);
            })
            .finally(function(data){
                done();
            });

        // expect(scope.billingData.length).toEqual(5);    
        expect(scope.billingData.length).to.equal(5);    


        // scope.refresh();
        // scope.$on('scroll.refreshComplete',function(){
        //     expect(scope.billingData.length).toEqual(5);    
        //     done();
        // });
        
    });
});