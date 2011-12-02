/**
  * Ext.ux.IconCombo Extension Class for Ext 4.x Library
  *
  * @author  Daniel Kuhnley
  * @class Ext.ux.IconCombo
  * @extends Ext.form.field.ComboBox
  */
Ext.define('Ext.ux.form.IconCombo',{
  extend:'Ext.form.field.ComboBox',
  alias:'widget.iconcombo',

    initComponent:function() {
        Ext.apply(this, {
      listConfig: {
        iconClsField:this.iconClsField,
        getInnerTpl: function() {
          return '<tpl for=".">'
            + '<div class="x-combo-list-item ux-icon-combo-item '
            + '{' +this.iconClsField+ '}">'
            + '{' + this.displayField + '}'
            + '</div></tpl>';
        },
        scope:this
      },
      scope:this
    });
 
        // call parent initComponent
    this.callParent(arguments);
 
    }, // end of function initComponent
 
    onRender:function(ct, position) {
        // call parent onRender
        this.callParent(arguments);
 
        // adjust styles
        this.bodyEl.applyStyles({position:'relative'});
        this.el.down('input.x-form-field').addCls('ux-icon-combo-input');
 
        // add div for icon
        this.icon = Ext.core.DomHelper.append(this.el.down('div.x-form-item-body'), {
            tag: 'div', style:'position:absolute'
        });
    }, // end of function onRender
 
    setIconCls: function() {
        if (this.rendered) {
            var rec = this.store.findRecord(this.valueField, this.getValue());
            if (rec) this.icon.className = 'ux-icon-combo-icon ' + rec.get(this.iconClsField);
        } else {
            this.on('render', this.setIconCls, this, { single: true } );
        }
    }, // end of function setIconCls
 
    setValue: function(value) {
        this.callParent(arguments);
        this.setIconCls();
    } // end of function setValue
});