/**
 * Created by andreas on 2/1/2016.
 */
describe('utils', function(){
    beforeEach(module('django-angular'));
    beforeEach(function(){
        module(function($provide){
            $provide.value('$timeout', mockTimeout);
        })
    });
    describe('MaterialService', function(){
        var Material;

        beforeEach(inject(function(_Material_){
            Material = _Material_;
            spyOn($.material,'init');
            spyOn($.material,'ripples');
        }));
        it('should call material.init', function(){
            Material.init();
            expect($.material.init).toHaveBeenCalled();
        });
        it('should call material.ripples', function(){
            Material.ripples();
            expect($.material.ripples).toHaveBeenCalled();
        });

    });
});