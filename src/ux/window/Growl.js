Ext.define('Ext.ux.window.Growl', {
    extend: 'Ext.Component',
    singleton: true,
    container: undefined,
    closerTpl: '<div class="x-growl-msg-close"></div>',
    basicTpl: '<div class="x-growl-msg">{0}</div>',
    fullTpl: '<div class="x-growl-msg {2} {3}"><div class="x-growl-msg-title">{0}</div><div class="x-growl-msg-body">{1}</div></div>',
    timer: undefined,
    
    cfg: {
        aligment: "t-t",
        duration: 3000,
        context: document,
        offset: [0, 0],
        
        show: function(notification, options) {
            if (!options.pin) {
                notification.fadeIn({duration: 1000})
                this.timer = setTimeout("notification.fadeOut({duration: 1000, remove: true})",
                                        options.ducation);
            } else {
                notification.fadeIn({duration: 1000});
            }
        },
        
        close: function(notification, evt, elt, options) {
            clearTimeout(this.timer);
            notification.fadeOut({remove: true});
        },
        
			  click: Ext.emptyFn
    },
        

    getContainer: function() {
        if (!this.container) {
            this.container = Ext.DomHelper.insertFirst(document.body, {id:'x-growl-ct'}, true);
        }
        
        return this.container;
    },
    
    notify: function(options) {
        Ext.applyIf(options, this.cfg),

        container = this.getContainer(),
        hasIcon = options.iconCls ? "x-growl-msg-has-icon" : "",
        hasTitle = options.title ? "x-growl-msg-has-title" : "",
        content = options.content ? Ext.String.format(this.basicTpl, options.content) : 
            Ext.String.format(this.fullTpl, options.title || "", options.message || "", hasTitle + " " + hasIcon, options.iconCls || "");
        
        notification = Ext.DomHelper[options.alignment.indexOf("b") === -1 ? "append" : "insertFirst"](container, content, true);

        notification.on("click", function(evt, elt, op) {
				    if (Ext.fly(elt).hasCls("x-growl-msg-close")) {
                options.close(notification, evt, elt, options);					
				    } else {
					      options.click(notification, evt, elt, options);
				    }
        });
        
        if (options.closable !== false) {
            closer = Ext.DomHelper.append(notification, this.closerTpl, true);
            //notification.hover(closer.fadeIn, closer.fadeOut, closer);
        }
        
        container.alignTo(options.context, options.alignment, options.offset);
        
        options.show(notification, options);
    }    
});