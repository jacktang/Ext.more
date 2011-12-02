/**
 * 时间输入框, 三个整数框分别输入时,分,秒.
 */
Ext.define('Ext.ux.form.TimePickerField', {
	  extend: 'Ext.form.field.Base',
	  alias: 'widget.timepicker',
	  alternateClassName: 'Ext.form..field.TimePickerField',
	  requires: ['Ext.form.field.Number'],
	  
	  // 隐藏BaseField的输入框 , hidden basefield's input
	  inputType: 'hidden',
	  
	  style: 'padding:4px 0 0 0;margin-bottom:0px',
	  
	  hoursSpinner: null,
	  minutesSpinner: null,
	  secondsSpinner: null,
	  
	  // 数字输入框参数, number input config
	  spinnerCfg: {
		  width: 40
	  },
	  
	  initComponent: function() {
		  var cfg = Ext.apply({}, this.spinnerCfg, {
			    readOnly: this.readOnly,
			    disabled: this.disabled,
			    style: 'float: left',
			    listeners: {
				    change: {
					    fn: this.onSpinnerChange,
					    scope: this
				    }
			    }
		    });
		  
		  this.spinners = [];
		  
		  this.hoursSpinner = Ext.create('Ext.form.field.Number', Ext.apply({}, cfg, {
			      minValue: 0,
			      maxValue: 23
		      }));
		  this.minutesSpinner = Ext.create('Ext.form.field.Number', Ext.apply({}, cfg, {
			      minValue: 0,
			      maxValue: 59
		      }));
		  // TODO 使用timeformat 判断是否创建秒输入框,  may be second field is no need.
		  this.secondsSpinner = Ext.create('Ext.form.field.Number', Ext.apply({}, cfg, {
			      minValue: 0,
			      maxValue: 59
		      }));
		  
		  this.spinners.push(this.hoursSpinner);
		  this.spinners.push(this.minutesSpinner);
		  this.spinners.push(this.secondsSpinner);
		  this.callParent();
	  },
	  
	  onRender: function() {
		  // 取得初始值, 添加三个整数输入框.  Deal whit init Value
		  this.value = this.value || Ext.Date.format(new Date(), 'H:i:s');
		  this.rawValue = this._valueSplit(this.value);
		  
		  this.callParent(arguments);
		  // render  to  original BaseField input div. 
		  var spinnerWrap = Ext.get(Ext.DomQuery.selectNode('div', this.el.dom));
		  this.callSpinnersFunction('render', spinnerWrap);
		  
		  Ext.core.DomHelper.append(spinnerWrap, {
			    tag: 'div',
			    cls: 'x-form-clear-left'
		    });
	  },
	  _valueSplit: function(v) {
		  var split = v.split(':');
		  return {
			  h: split.length > 0 ? split[0] : 0,
			  m: split.length > 1 ? split[1] : 0,
			  s: split.length > 2 ? split[2] : 0
		  };
	  },
	  onSpinnerChange: function() {
		  if (!this.rendered) {
			  return;
		  }
		  this.fireEvent('change', this, this.getValue(), this.getRawValue());
	  },
	  // 依次调用各输入框函数
	  callSpinnersFunction: function(funName, args) {
		  for (var i = 0; i < this.spinners.length; i++) {
			  this.spinners[i][funName](args);
		  }
	  },
	  disable: function() {
		  this.callParent(arguments);
		  this.callSpinnersFunction('disable', arguments);
	  },
	  enable: function() {
		  this.callParent(arguments);
		  this.callSpinnersFunction('enable', arguments);
	  },
	  setReadOnly: function() {
		  this.callParent(arguments);
		  this.callSpinnersFunction('setReadOnly', arguments);
	  },
	  clearInvalid: function() {
		  this.callParent(arguments);
		  this.callSpinnersFunction('clearInvalid', arguments);
	  },
	  getRawValue: function() {
		  if (!this.rendered) {
			  this.date = new Date();
			  return {
				  h: this.date.getHours(),
				  m: this.date.getMinutes(),
				  s: this.date.getSeconds()
			  };
		  } else {
			  return {
				  h: this.hoursSpinner.getValue(),
				  m: this.minutesSpinner.getValue(),
				  s: this.secondsSpinner.getValue()
			  };
		  }
	  },
	  setRawValue: function(values) {
		  if (this.hoursSpinner) {
			  this.hoursSpinner.setValue(values.h);
			  this.minutesSpinner.setValue(values.m);
			  this.secondsSpinner.setValue(values.s);
		  }
	  },
	  isValid: function(preventMark) {
		  return this.hoursSpinner.isValid(preventMark) && this.minutesSpinner.isValid(preventMark)
		    && this.secondsSpinner.isValid(preventMark);
	  },
	  validate: function() {
		  return this.hoursSpinner.validate() && this.minutesSpinner.validate()
		    && this.secondsSpinner.validate();
	  },
	  getValue: function() {
		  var v = this.getRawValue();
		  return Ext.String.leftPad(v.h, 2, '0') + ':' + Ext.String.leftPad(v.m, 2, '0') + ':'
		    + Ext.String.leftPad(v.s, 2, '0');
	  },
	  setValue: function(value) {
		  if (!this.rendered) {
			  this.value = value;
			  return;
		  }
		  value = this._valueSplit(value);
		  this.setRawValue(value);
		  this.validate();
	  }
  });