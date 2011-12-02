/**
* Ext.ux.LoginDialog Class
*
* @extends Ext.window.Window
* @version 1.1
*
* @author Sumit Madan (c) 2011 License: MIT
* (http://www.opensource.org/licenses/mit-license.php)
*/

Ext.define('Ext.ux.LoginDialog', {
    extend: 'Ext.window.Window',
    requires: ['Ext.layout.container.Border', 'Ext.form.Panel', 'Ext.form.field.Checkbox', 'Ext.ux.form.IconCombo'],
    alias: 'widget.logindialog',

    cls: 'form-login-dialog',
    iconCls: 'form-login-icon-title',
    width: 420,
    height: 280,
    resizable: false,
    closable: false,
    draggable: true,
    modal: true,
    closeAction: 'hide',
    layout: 'border',
    title: 'Login',

    messages: undefined,
    qtips: undefined,

    headerPanel: undefined,
    formPanel: undefined,

    usernameField: undefined,
    passwordField: undefined,
    languageField: undefined,
    rememberMeField: undefined,

    forgotPasswordLink: '<a href="about:blank" target="_blank">Forgot Password ?</a>',

    loginAction: undefined,
    cancelAction: undefined,

    initComponent: function() {
        var config = {};
        Ext.applyIf(this, Ext.apply(this.initialConfig, config));

        this.messages = this.messages || {};
        this.messages = Ext.Object.merge({
            loginfailed: 'Unable to log in',
            wait: 'Please wait...',
            header: 'Access to this location is restricted to authorized users only.<br />' +
                'Please type your username and password.'
        }, this.messages);

        this.qtips = this.qtips || {};
        this.qtips = Ext.Object.merge({
            rememberme: 'This is not recommended for shared computers.',
            capslockwarning: '<div class="form-login-warning">Caps Lock is On</div><br />' +
                '<div>Having Caps Lock on may cause you to enter your password incorrectly.</div><br />' +
                '<div>You should press Caps Lock to turn it off before entering your password.</div>'
        }, this.qtips);


        this.headerPanel = this.headerPanel || {};
        this.headerPanel = Ext.create('Ext.panel.Panel', Ext.Object.merge({
            cls: 'form-login-header',
            baseCls: 'x-plain',
            html: this.messages.header,
            region: 'north',
            height: 60
        }, this.headerPanel));

        this.usernameField = this.usernameField || {};
        this.usernameField = Ext.Object.merge({
            xtype: 'textfield',
            ref: 'usernameField',
            name: 'data[User][username]',
            fieldLabel: 'Username',
            validateOnBlur: false,
            allowBlank: false
        }, this.usernameField);

        this.passwordField = this.passwordField || {};
        this.passwordField = Ext.Object.merge({
            xtype: 'textfield',
            ref: 'passwordField',
            inputType: 'password',
            name: 'data[User][password]',
            fieldLabel: 'Password',
            width: 300,
            validateOnBlur: false,
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                render: {
                    fn:function(field, eOpts) {
                        field.capsWarningTooltip = Ext.create('Ext.tip.ToolTip', {
                            target: field.bodyEl,
                            anchor: 'top',
                            width: 305,
                            html: this.qtips.capslockwarning
                        });

                        // disable to tooltip from showing on mouseover
                        field.capsWarningTooltip.disable();
                    },
                    scope:this
                },

                keypress: {
                    fn: function(field, e, eOpts) {
                        var charCode = e.getCharCode();
                        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
                            (!e.shiftKey && charCode >= 65 && charCode <= 90)) {

                            field.capsWarningTooltip.enable();
                            field.capsWarningTooltip.show();
                        }
                        else {
                            if(field.capsWarningTooltip.hidden === false) {
                                field.capsWarningTooltip.disable();
                                field.capsWarningTooltip.hide();
                            }
                        }
                    },
                    scope: this
                },

                blur: function(field) {
                    if(field.capsWarningTooltip.hidden === false) {
                        field.capsWarningTooltip.hide();
                    }
                }
            }
        }, this.passwordField);

        this.forgotPassword = {
            xtype: 'box',
            autoEl: {
                html: '<div style="font-size:11px; text-align: right; width: 388px;">' + this.forgotPasswordLink + '</div>'
            }
        };

        this.languageField = this.languageField || {};
        this.languageField = Ext.Object.merge({
            xtype: 'iconcombo',
            name: 'data[User][lang]',
            fieldLabel: 'Language',
            valueField: 'languageCode',
            value: 'en-us',
            displayField: 'languageName',
            iconClsField: 'countryFlag',
            triggerAction: 'all',
            editable: false,
            mode: 'local'
        }, this.languageField);

        this.languageField.store = this.languageField.store || {};
        this.languageField.store = Ext.create('Ext.data.ArrayStore', Ext.applyIf(this.languageField.store, {
            fields: ['languageCode', 'languageName', 'countryFlag'],
            data: [
                ['en-us', 'English - United States', 'flag-us']
            ]
        }));

        this.rememberMeField = this.rememberMeField || {};
        this.rememberMeField = Ext.Object.merge({
            xtype: 'checkbox',
            itemId: 'rememberMe',
            name: 'data[User][rememberme]',
            padding: '0 0 0 80',
            boxLabel: '&#160;' + 'Remember me on this computer',
            listeners: {
                render: function(checkbox) {
                    checkbox.bodyEl.child('input').set({
                        'data-qtip': this.qtips.rememberme
                    });
                },
                scope: this
            }
        }, this.rememberMeField);

        this.formPanel = this.formPanel || {};
        this.formPanel = Ext.create('Ext.form.Panel', Ext.Object.merge({
            bodyPadding: 10,
            header: false,
            region: 'center',
            border: false,
            waitMsgTarget: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                labelWidth: 75
            },
            items: [
                this.usernameField,
                this.passwordField,
                this.forgotPassword, {
                    xtype: 'box',
                    autoEl: 'div',
                    height: 10
                }, this.languageField,
                this.rememberMeField
            ]
        }, this.formPanel));

        this.loginAction = this.loginAction || {};
        this.loginAction = Ext.Object.merge({
            text: 'Login',
            ref: '../loginAction',
            iconCls: 'form-login-icon-login',
            scale: 'medium',
            width: 90,
            handler: this.submit,
            scope: this
        }, this.loginAction);

        this.cancelAction = this.cancelAction || {};
        this.cancelAction = Ext.Object.merge({
            text: 'Cancel',
            ref: '../cancelAction',
            iconCls: 'form-login-icon-cancel',
            scale: 'medium',
            width: 90,
            handler: this.cancel,
            scope: this
        }, this.cancelAction);

        this.buttons = this.buttons || [];
        this.buttons = this.buttons.concat([this.loginAction, this.cancelAction]);

        this.items = this.items || [];
        this.items = this.items.concat([this.headerPanel, this.formPanel]);

        this.keys = this.keys || [];
        this.keys = this.keys.concat([{
            key: [10,13],
            handler: this.submit,
            scope: this
        }]);

        if(this.cancelAction && (this.cancelAction.hidden === undefined || this.cancelAction.hidden === false)) {
            this.keys = this.keys.concat([{
                key: [27],
                handler: this.cancel,
                scope: this
            }]);
        }

        this.callParent(arguments);

        this.addEvents ('success', 'failure');
    },

    onShow: function() {
        this.callParent(arguments);
        this.formPanel.usernameField.focus(true, 300);
    },

    onRender: function() {
        this.callParent(arguments);
    },

    setMessage : function (msg) {
        this.headerPanel.update(msg);
    },

    setErrorMessage : function (msg) {
        var errorNode = Ext.DomQuery.selectNode('span[class=error]', this.headerPanel.getEl().dom);
        if(!errorNode) {
            Ext.DomHelper.insertHtml('beforeEnd',
                Ext.DomQuery.selectNode('div[id^=panel-]:last', this.headerPanel.getEl().dom),
                '<br /><span class="error"></span>');
            errorNode = Ext.DomQuery.selectNode('span[class=error]', this.headerPanel.getEl().dom);
        }
        Ext.get(errorNode).update(msg);
    },

    submit: function () {
        var form = this.formPanel.getForm();

        if (form.isValid())
        {
            this.loginAction.disable();
            if(this.cancelAction instanceof Ext.Button) {
                this.cancelAction.disable();
            }
            this.setErrorMessage('');
            form.submit({
                url: form.url,
                method: form.method || 'post',
                waitMsg: form.waitMsg || 'Please wait...',
                success: this.onSuccess,
                failure: this.onFailure,
                scope: this
            });
        }
    },

    cancel: function() {
        this.hide();
    },

    onSuccess: function (form, action) {
        this.formPanel.passwordField.setRawValue('');

        this.loginAction.enable();
        if(this.cancelAction instanceof Ext.Button) {
            this.cancelAction.enable();
        }
        this.hide();

        this.fireEvent('success', this, form, action);
    },

    onFailure: function (form, action) {
        this.loginAction.enable();
        if(this.cancelAction instanceof Ext.Button) {
            this.cancelAction.enable();
        }

        this.formPanel.passwordField.focus(true, 300);

        var msg = this.messages.loginfailed;
        if (action.result && action.result.message) {
            msg = action.result.message;
        }
        this.setErrorMessage (msg);

        this.fireEvent('failure', this, form, action);
    }
});
