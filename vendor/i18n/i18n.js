(function(globals) {
  var translations = {
    'en-us': {
      tab: {
        editFlow: 'Edit Flow',
        addStep: 'Add Step',
        editStep: 'Edit Step'
      },
      addStep: {
        start: 'Start',
        end: 'End',
        process: 'Process',
        condition: 'Condition'
      },
      editStep: {
        fieldName: 'Name',
        fieldType: 'Type',
        ops: {
          label: 'Property',
          title: 'Title',
          desp: 'Description',
          condition: 'Condition'
        }
      }
    },

    'zh-cn': {
      tab: {
        editFlow: '编辑流程',
        addStep: '添加步骤',
        editStep: '编辑步骤'
      },
      addStep: {
        start: '开始',
        end: '结束',
        process: '处理',
        condition: '条件'
      },
      editStep: {
        fieldName: '名称',
        fieldType: '类型',
        ops: {
          label: '属性',
          title: '标题',
          desp: '描述',
          condition: '条件'
        }
      }
    }
  };

   /*
    var json = {a: {b: {c: 1}}}
    getPath(json, 'a.b.c') => 1
  */
  function getPath(root, path) {
    var parts, idx, len;
    parts = path.split(".");
    len = parts.length;
    for (idx = 0; root != null && idx < len; idx++) {
      root = root[parts[idx]];
    }
    return root;
  }

  if ( globals.I18nFlow == null ) { globals.I18nFlow = {}; }

  var I18nFlow = globals.I18nFlow,
    localStorage = globals.localStorage,
    defaultLocale = 'en-us';

  var locale = localStorage.getItem('ember-cli-flowbuilder-i18n-locale') || defaultLocale;
  I18nFlow.translations = translations[locale] || translations[defaultLocale];

  I18nFlow.t = function (keyPath) {
    return getPath(this.translations, keyPath);
  };
}(this));
