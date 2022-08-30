module.exports = class Layout {
    print(request, response) {
        response.render('admin/layout',{form: {}});   
    }
};