/**
 * Created by andreas on 2/1/2016.
 */
describe('utils', function(){
    beforeEach(module('django-angular'));

    describe('SnackbarService', function(){
        var Snackbar;

        beforeEach(inject(function(_Snackbar_){
            Snackbar = _Snackbar_;
            spyOn($,'snackbar');
        }));
        it('should call snackbar to display message', function(){
            Snackbar.show('A message');
            expect($.snackbar).toHaveBeenCalledWith({ timeout: 3000, content: 'A message' });
        });
        it('should call snackbar to display error message', function(){
            Snackbar.error('A message');
            expect($.snackbar).toHaveBeenCalledWith({ timeout: 3000, content: 'Error: A message' });
        });
    });
});