Ext.Loader.setConfig({
  enabled: true,
  paths: {
    'Ext.ux': 'http://extjs.cachefly.net/ext-4.0.7-gpl/examples/ux/',
    'Ext.ux.datetime': '../../ux/datetime',
    'Ext.ux.form': '../../ux/form',
  }
});

Ext.require([
    'Ext.panel.Panel',
    'Ext.ux.form.TimePickerField',
    'Ext.ux.form.DateTimeField',
    'Ext.ux.datetime.DateTimeMenu',
]);

Ext.onReady(function(){
    var dateTimeField = Ext.create('Ext.ux.form.DateTimeField', {
			  name: 'datetime',
			  labelWidth: 65,
			  width: 160,
			  labelAlign: 'right',
			  fieldLabel: 'DateTime'
		});
		
		var timeField = Ext.create('Ext.ux.form.TimePickerField', {
			  name: 'time',
			  labelWidth: 65,
			  width: 190,  // this is required to keep fields  one line
			  labelAlign: 'right',
			  fieldLabel: 'TIME'
		});

    console.log("hello");

		Ext.create('Ext.panel.Panel', {
        renderTo: 'datetime',
			  dockedItems: [{
				    xtype: 'toolbar',
				    dock: 'top',
				    items: [
                {
                    xtype: 'button',
					          text: 'DateTime Menu',
					          menu: Ext.create('Ext.ux.datetime.DateTimeMenu', {
						            handler: function(field, date) {
						            }
					          })
				        },
                dateTimeField,
                timeField]
			  }]
		});
    console.log("hello2");
    
});