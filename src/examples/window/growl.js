Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux.window': '../../ux/window/'
    }
});

Ext.require([
    'Ext.Button',
    'Ext.ux.window.Growl'
]);

Ext.onReady(function() {
    new Ext.Button({
        text: "Show notification",
        renderTo: "demo-button",
        handler: function() {
            Ext.ux.window.Growl.notify({
                //pin: true,
                ducation: 5000,
                title: "Something Happened", 
                message: "If you get a sec, could you please do something about it?",
                iconCls: "x-growl-icon",
                alignment: "tr-tr",
                offset: [-10, 10]
            })
        }
    });
});