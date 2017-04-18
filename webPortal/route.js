Router.configure({
  // the default layout
  layoutTemplate: 'mainSide'
});

Router.route('/', function () {
  this.render('realtimePage');
  this.layout('mainSide');
});
 
Router.route('/users', function () {
  this.render('usersPage');
  this.layout('mainSide');
});

Router.route('/robots', function () {
  this.render('robotsPage');
  this.layout('mainSide');
});

Router.route('/maps', function () {
  this.render('mapsPage');
  this.layout('mainSide');
});

Router.route('/changePath', function () {
  this.render('pathPage');
  this.layout('mainSide');
});