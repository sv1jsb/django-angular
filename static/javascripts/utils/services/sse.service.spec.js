/**
 * Created by andreas on 8/1/2016.
 */
describe('utils', function(){
    var mockEventSource = function(url){
        var o = {
            onmessage: null
        };
        return o
    };
    beforeEach(module('django-angular'));
    beforeEach(function(){
        module(function($provide){
            $provide.value('$timeout', mockTimeout);
            $provide.value('EventSource', mockEventSource)
        })
    });
    describe('SseService', function(){
        var Sse, $rootScope;

        beforeEach(inject(function(_Sse_, _$rootScope_){
            $rootScope = _$rootScope_;
            Sse = _Sse_;
            spyOn($rootScope,'$broadcast');
        }));
        it('should call $rootScope.$broadcast', function(){
            Sse.evtSrc.onmessage({data: '{"event": "", "data":""}'});
            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
    })
});