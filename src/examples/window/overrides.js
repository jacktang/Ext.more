// Implement 'ref' and 'keys' configs from ExtJS 3
Ext.require('Ext.Component', function() {
    Ext.Component.implement({
        initRef: function () {
            if(this.ref && !this.refOwner){
                var levels = this.ref.split('/'),
                    last = levels.length,
                    i = 0,
                    t = this;

                while(t && i < last){
                    t = t.ownerCt;
                    ++i;
                }
                if(t){
                    t[this.refName = levels[--i]] = this;
                    this.refOwner = t;
                }
            }
        }
    });

    Ext.override(Ext.Component, {
        afterRender: function () {
            this.callOverridden();
            this.initRef();
            if(this.keys && this.getKeyMap && this.getKeyMap()) {
                this.getKeyMap().addBinding(this.keys);
            }
        }
    });
});