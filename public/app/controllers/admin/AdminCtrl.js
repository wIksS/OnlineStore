/**
 * Created by Виктор on 10.10.2014 г..
 */
app.controller('AdminCtrl',function($scope,ProductResource){
    $scope.deleteProduct = function(id){
        ProductResource.delete({id:id},function(err){
            if(err){
                notifier.error(err)
            }
            else{
                notifier.success('Succesfuly deleted product');
            }
        });
    }
});