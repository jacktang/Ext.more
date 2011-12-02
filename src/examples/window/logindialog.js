Ext.Loader.setConfig({
  enabled: true,
    paths: {
        'Ext.ux': 'http://extjs.cachefly.net/ext-4.0.7-gpl/examples/ux/',
        'Ext.ux.form': '../../ux/form',
        'Ext.ux.window': '../../ux/window'
  }
});

Ext.require([
    'Ext.form.*',
    'Ext.ux.window.LoginDialog'
]);

Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var loginDialog = Ext.create('Ext.ux.window.LoginDialog', {
        forgotPasswordLink: '<a href="http://support.microsoft.com/kb/189126" target="_blank">Forgot Password ?</a>',
        formPanel: {
            url: '/users/login.php'
        }
    });
    
    loginDialog.show();
});