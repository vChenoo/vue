import Mock from 'mockjs'
/* const Random = Mock.Random */

Mock.mock('/login', {
	'data': {
		'username': 'tester'
	}
})

/* 常量 */
var _Vcode = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
Mock.mock('/constant/whether', {
	'data|2': [{
		'name|+1': ['是', '否'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/report', {
	'data|2': [{
		'name|+1': ['健康体检报告', '职业体检报告'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/occupational', {
	'data|5': [{
		'name|+1': ['无', '尘肺', '铅及其化合物中毒', '激光所致眼损伤', '白斑'],
		'code|+1': _Vcode.slice(0)
	}]
})
let _servicetype = ['健康体检', '职业体检', '从业体检', '招工体检', '学生体检', '征兵体检']
Mock.mock('/constant/servicetype', {
	'data|6': [{
		'name|+1': _servicetype,
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/sex', {
	'data|3': [{
		'name|+1': ['不限', '男', '女'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/logtype', {
	'data|4': [{
		'name|+1': ['新增', '编辑', '删除', '其他'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/resulttype', {
	'data|2': [{
		'name|+1': ['字符', '数值'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/department', {
	'data|10': [{
		'name|+1': ['一般情况', '内科', '外科', '眼科', '耳鼻喉科', '妇科', '检验科', '心电科', '放射科', 'B超'],
		'code|+1': _Vcode.slice(0),
		'type|+1': _Vcode.slice(0, 3),
		'isenabled|1': _Vcode.slice(0, 2),
		'remark': '@cparagraph',
		'lasttime': '@datetime',
		'lastaccount': '@cname'
	}]
})
Mock.mock('/constant/dptype', {
	'data|3': [{
		'name|+1': ['检查科室', '功能科室', '检验科室'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/accesstype', {
	'data|2': [{
		'name|+1': ['手工', '导入'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/checktype', {
	'data|2': [{
		'name|+1': ['医生检查', '检验项目'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/mealtime', {
	'data|2': [{
		'name|+1': ['餐前', '餐后'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/interfacetype', {
	'data|2': [{
		'name|+1': ['申请单', '报告单'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/marriage', {
	'data|4': [{
		'name|+1': ['未婚', '已婚', '丧偶', '离婚'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/orggrouptype', {
	'data|2': [{
		'name|+1': ['项目分组', '金额分组'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/statementtype', {
	'data|3': [{
		'name|+1': ['登记人数', '实检人数', '项目已检人数'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/paytype', {
	'data|2': [{
		'name|+1': ['单位', '个人'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/nature', {
	'data|8': [{
		'name|+1': ['有限责任公司', '股份有限公司', '国有独资公司', '个人独资企业', '合伙企业', '个体工商户', '外商投资企业', '私营企业'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/cardtype', {
	'data|5': [{
		'name|+1': ['身份证', '护照', '医保卡', '健康卡', '其他'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/workstation', {
	'data|6': [{
		'name|+1': ['工作台1', '工作台2', '工作台3', '工作台4', '工作台5', '工作台6'],
		'code|+1': _Vcode.slice(0)
	}]
})
Mock.mock('/constant/totalgroup', {
	'data|4': [{
		'name|+1': ['总检分组1', '总检分组2', '总检分组3', '总检分组4'],
		'code|+1': _Vcode.slice(0)
	}]
})

/* 基础数据维护 */
let _color = ['白色', '浅灰色', '深灰色', '红色', '暗红色', '绿色', '暗绿色', '蓝色', '黄色']
Mock.mock('/database/color', {
	'data|9': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'name|+1': _color,
		'code|+1': 1
	}]
})

let _clinical = ['血球类', '生化类', '酶免类', '酶标类', '尿类', '血凝类', '血流类', '微量元素', 'PCR分析', '蛋白分析', '其他类']
Mock.mock('/database/clinical', {
	'data|11': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'name|+1': _clinical,
		'code|+1': _Vcode.slice(0),
		'color|1-9': 1
	}]
})

/* Mock.mock('/database/servicetype', {
	'data|6': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'typename|+1': _servicetype,
		'isenabled|1': ['1', '2']
	}]
}) */
let _testtype = ['调干', '司机年审', '健康人员', '儿童体检', '入职体检', '飞行员体检']
Mock.mock('/database/testtype', {
	'data|6': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'name|+1': _testtype,
		'code|+1': _Vcode.slice(0),
		'report|1': _Vcode.slice(0, 2),
	  'occupational|1': _Vcode.slice(0, 5),
	  'service|1': _Vcode.slice(0, 6),
	  'remark': '@cparagraph'
	}]
})
let _sample = ['血', '小便', '白带', '前列腺液', '痰液', '大便', '组织切片', '组织涂片']
Mock.mock('/database/sample', {
	'data|9': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'name|+1': _sample,
		'code|+1': _Vcode.slice(0),
		'sex|1': _Vcode.slice(0, 3),
		'remark': '@cparagraph'
	}]
})
Mock.mock('/database/logo', {
	'data': {
		logo: '@dataImage'
	}
})
let _invoice = ['西药费', '中成药', '检查费', '治疗费']
Mock.mock('/database/invoice', {
	'data|4': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'name|+1': _invoice,
		'code|+1': _Vcode.slice(0),
		'isenabled|1': _Vcode.slice(0, 2)
	}]
})
let _collect = ['医生检查费', '医生治疗费', '放射费', '化验费']
Mock.mock('/database/collect', {
	'data|4': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'name|+1': _collect,
		'code|+1': _Vcode.slice(0),
		'invoice|1': _Vcode.slice(0, 4),
		'isenabled|1': _Vcode.slice(0, 2)
	}]
})
let _othercharges = ['抽血费', '其他相关费']
Mock.mock('/database/othercharges', {
	'data|2': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'name|+1': _othercharges,
		'code|+1': _Vcode.slice(0),
		'collect|1': _Vcode.slice(0, 4),
		'price|5-55': 9,
		'isenabled|1': _Vcode.slice(0, 2)
	}]
})
let _consumable = ['检测卡', '耦合剂', '试纸', '一次性采血管', '一次性加样管', '一次性手套', '一次性尿杯', '一次性垫单', '一次性窥器']
Mock.mock('/database/consumable', {
	'data|9': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'name|+1': _consumable,
		'code|+1': _Vcode.slice(0),
		'specification': '@string',
		'unit': '@string',
		'price|5-55': 9,
		'company': '@string',
		'isenabled|1': _Vcode.slice(0, 2),
		'ishighvalue|1': _Vcode.slice(0, 2),
		'remark': '@cparagraph'
	}]
})
/* 系统工具 */
Mock.mock('/systemtools/systemlog', {
	'data|22-33': [{
		'date': '@datetime',
		'name': '@cname',
		'account': '@string',
		'type|1': _Vcode.slice(0, 4),
		'content': '@cparagraph',
		'number': '@id',
		'ipaddress': '@ip'
	}]
})
Mock.mock('/systemtools/account', {
	'data|3': [{
		'name': '@cname',
		'account': '@string',
		'isenabled|1': _Vcode.slice(0, 2),
		'lasttime': '@datetime',
		'lastip': '@ip'
	}]
})
/* 体检设置 */
let _project = ['身高', '体重', '血压', '呼吸', '脉搏', '收缩压']
Mock.mock('/testsetting/testproject', {
	'data|6': [{
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'department|1': _Vcode.slice(0, 10),
		'name|+1': _project,
		'code|+1': _Vcode.slice(0),
		'price|5-55': 9,
		'sex|1': _Vcode.slice(0, 3),
		'clinical|1': _Vcode.slice(0, 11),
		'unit': '@string',
		'resulttype|1': _Vcode.slice(0, 2),
		'result': '@string',
		'ispositive|1': _Vcode.slice(0, 2),
		'isenabled|1': _Vcode.slice(0, 2)
	}]
})
let _group = ['血压', '身高、体重、血压', '血常规', '肝功能五项', '心电图', '耳鼻喉']
Mock.mock('/testsetting/groupproject', {
	'data|6': [{
		'name|+1': _group,
		'code|+1': _Vcode.slice(0),
		'department|1': _Vcode.slice(0, 10),
		'clinical|1': _Vcode.slice(0, 11),
		'collect|1': _Vcode.slice(0, 4),
		'sex|1': _Vcode.slice(0, 3),
		'isgynaecology|1': _Vcode.slice(0, 2),
		'accesstype|1': _Vcode.slice(0, 2),
		'checktype|1': _Vcode.slice(0, 2),
		'checktime|3-55': 5,
		'issample|1': _Vcode.slice(0, 2),
		'sample|1': _Vcode.slice(0, 9),
		'mealtime|1': _Vcode.slice(0, 2),
		'isblood|1': _Vcode.slice(0, 2),
		'originalprice|3-100': 10,
		'discount|50-100': 90,
		'lowestdiscount': function() {
			return this.discount - 10
		},
		'price': function() {
			return this.originalprice * this.discount / 100
		},
		'isapplication|1': _Vcode.slice(0, 2),
		'interfacetype|1': _Vcode.slice(0, 2),
		'appinterface': '@id',
		'reportinterface': '@id',
		'tip': '@string',
		'result': '@string',
		'clinicalsign': '@string',
		'pinyin': '@string',
		'wubi': '@string',
		'isenabled|1': _Vcode.slice(0, 2),
		'project': ['1', '2', '3', '4'],
		'consumable': []
	}]
})
let _package = ['套餐A', '套餐B', '套餐C']
Mock.mock('/testsetting/package', {
	'data|3': [{
		'name|+1': _package,
		'code|+1': _Vcode.slice(0),
		'shorthand': '@name',
		'testtype|1': _Vcode.slice(0, 6),
		'isenabled|1': _Vcode.slice(0, 2),
		'sex|1': _Vcode.slice(0, 3),
		'remark': '@cparagraph',
		'profile': '@cparagraph',
		'groupproject': [{
			'name': '身高、体重、血压',
			'code': '2',
			'price': '10'
		}, {
			'name': '心电图',
			'code': '5',
			'price': '30'
		}],
		'originalprice': 0,
		'discount|50-100': 90,
		'price': function() {
			return this.originalprice * this.discount / 100
		}
	}]
})
let _conclusion = ['无', '健康', '十分健康', '亚健康', '定期复查', '立即治疗']
Mock.mock('/testsetting/conclusion', {
	'data|6': [{
		'name|+1': _conclusion,
		'code|+1': _Vcode.slice(0),
		'remark': '@cparagraph',
		'lasttime': '@datetime',
		'lastaccount': '@cname',
		'value': function() {
			return this.name
		}
	}]
})
let _diagnose = ['OSAS综合征', '肥厚性鼻炎', '多发性肾', '慢性中耳炎', '神经性耳聋', '声带小结', '声嘶', '悬肉样变', '颌下淋巴结肿大', '陈旧性鼓膜穿孔', '泥沙样胆囊结石']
Mock.mock('/testsetting/diagnose', {
	'data|11': [{
		'name|+1': _diagnose,
		'code|+1': _Vcode.slice(0),
		'department|1': _Vcode.slice(0, 10),
		'clinical|1': _Vcode.slice(0, 11),
		'isillness|1': _Vcode.slice(0, 2),
		'iscommon|1': _Vcode.slice(0, 2),
		'describe': '@cparagraph',
		'pinyin': '@string',
		'wubi': '@string',
		'science': '@cparagraph',
		'suggestion': []
	}]
})
let _result = ['偏低', '正常', '偏高']
Mock.mock('/testsetting/result', {
	'data|3': [{
		'desc|+1': _result,
		'code|+1': _Vcode.slice(0),
		'diagnose|1': _Vcode.slice(0, 11),
		'lower|1-100': 18,
		'lowerunit': function() {
			if (this.lower > 12) {
				return '岁'
			} else {
				return ['月', '岁'][Math.round(Math.random())]
			}
		},
		'upper': function() {
			return this.lower + 18 < 100 ? this.lower + 18 : 100
		},
		'upperunit': function() {
			if (this.upper > 12 || this.lowerunit === '月') {
				return '岁'
			} else {
				return ['月', '岁'][Math.round(Math.random())]
			}
		},
		'min': 1,
		'max': 10,
		'isnormal|1': _Vcode.slice(0, 2),
		'ispositive|1': _Vcode.slice(0, 2),
		'isresultin|1': _Vcode.slice(0, 2),
		'isdiagnosein|1': _Vcode.slice(0, 2),
		'sex|1': _Vcode.slice(1, 3),
		'pinyin': '@string',
		'wubi': '@string'
	}]
})
let _workstation = ['工作台1', '工作台2', '工作台3', '工作台4', '工作台5', '工作台6']
Mock.mock('/testsetting/workstation', {
	'data|6': [{
		'name|+1': _workstation,
		'code|+1': _Vcode.slice(0),
		'department|1': _Vcode.slice(0, 10),
		'clinical|1': _Vcode.slice(0, 11),
		'tip': '@string',
		'address': '@string',
		'isenabled|1': _Vcode.slice(0, 2),
		'account': '1',
		'groupproject': '1'
	}]
})
/* 体检登记 */
Mock.mock('/register/prepersonal', {
	'data|16-30': [{
		'name|+1': '@cname',
		'code|+1': _Vcode.slice(0),
		'date': '@datetime',
		'times|1-5': 1,
		'testtype|1': _Vcode.slice(0, 6),
		'idcard': '@id',
		'sex|1': _Vcode.slice(1, 3),
		'birthday': '@date',
		'age': function() {
			let r = this.birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null)	return ''
      return new Date().getFullYear() - r[1]
		},
		'province': '@province',
		'city': '@city',
		'county': '@county',
		'marriage|1': _Vcode.slice(0, 4),
		'nation': '汉',
		'detailaddr': function() {
			return this.county + this.city + this.province + 'xx街道xx号'
		},
		'phone': '@id',
		'email': '@email',
		'profession': '@string'
	}]
})
Mock.mock('/register/formalregister', {
	'data|16-30': [{
		'name|+1': '@cname',
		'code|+1': _Vcode.slice(0),
		'date': '@datetime',
		'times|1-5': 2,
		'testtype|1': _Vcode.slice(0, 6),
		'prepareid': '18012601',
		'isorg|1': _Vcode.slice(0, 2),
		'org|1': _Vcode.slice(0, 10),
		'idcard': '@id',
		'sex|1': _Vcode.slice(1, 3),
		'birthday': '@date',
		'age': function() {
			let r = this.birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null)	return ''
      return new Date().getFullYear() - r[1]
		},
		'province': '@province',
		'city': '@city',
		'county': '@county',
		'marriage|1': _Vcode.slice(0, 4),
		'nation': '汉',
		'detailaddr': function() {
			return this.county + this.city + this.province + 'xx街道xx号'
		},
		'phone': '@id',
		'email': '@email',
		'profession': '@string'
	}]
})
Mock.mock('/register/orgregister', {
	'data|16-30': [{
		'name|+1': '@cname',
		'code|+1': _Vcode.slice(0),
		'idcard': '@id',
		'sex|1': _Vcode.slice(1, 3),
		'birthday': '@date',
		'age': function() {
			let r = this.birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null)	return ''
      return new Date().getFullYear() - r[1]
		},
		'organization|1': _Vcode.slice(0, 11),
		'orggroup|1': _Vcode.slice(0, 6),
		'isregister|1': _Vcode.slice(0, 2)
	}]
})
/* 体检管理 */
Mock.mock('/management/personalexamination', {
	'data|16-30': [{
		'name|+1': '@cname',
		'code|+1': _Vcode.slice(0),
		'date': '@date',
		'times|1-5': 2,
		'testtype|1': _Vcode.slice(0, 6),
		'prepareid': '18012601',
		'registerid': '18012601',
		'isorg|1': _Vcode.slice(0, 2),
		'org|1': _Vcode.slice(0, 10),
		'idcard': '@id',
		'sex|1': _Vcode.slice(1, 3),
		'birthday': '@date',
		'age': function() {
			let r = this.birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null)	return ''
      return new Date().getFullYear() - r[1]
		},
		'istotal|1': _Vcode.slice(0, 2),
		'phone': '@id',
		'address': '@county'
	}]
})
Mock.mock('/management/reportsend', {
	'data|16-30': [{
		'name|+1': '@cname',
		'code|+1': _Vcode.slice(0),
		'date': '@datetime',
		'times|1-5': 2,
		'testtype|1': _Vcode.slice(0, 6),
		'prepareid': '18012601',
		'registerid': '18012601',
		'isorg|1': _Vcode.slice(0, 2),
		'org|1': _Vcode.slice(0, 10),
		'idcard': '@id',
		'sex|1': _Vcode.slice(1, 3),
		'birthday': '@date',
		'age': function() {
			let r = this.birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null)	return ''
      return new Date().getFullYear() - r[1]
		},
		'issend|1': _Vcode.slice(0, 2),
		'sender': '@cname',
		'senddate': '@date',
		'print': 1
	}]
})
Mock.mock('/management/personalinfo', {
	'data|16-30': [{
		'name|+1': '@cname',
		'code|+1': _Vcode.slice(0),
		'idcard': '@id',
		'cardtype|1': _Vcode.slice(0, 5),
		'sex|1': _Vcode.slice(1, 3),
		'birthday': '@date',
		'age': function() {
			let r = this.birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null)	return ''
      return new Date().getFullYear() - r[1]
		},
		'province': '@province',
		'city': '@city',
		'county': '@county',
		'marriage|1': _Vcode.slice(0, 4),
		'nation': '汉',
		'detailaddr': function() {
			return this.county + this.city + this.province + 'xx街道xx号'
		},
		'phone': '@id',
		'email': '@email',
		'profession': '@string',
		'organization|1': _Vcode.slice(0, 11),
		'orggroup|1': _Vcode.slice(0, 6)
	}]
})
Mock.mock('/management/orggroup', {
	'data|6-11': [{
		'name|+1': '@ctitle',
		'code|+1': _Vcode.slice(0),
		'testtype|1': _Vcode.slice(0, 6),
		'isenabled|1': _Vcode.slice(0, 2),
		'grouptype|1': _Vcode.slice(0, 2),
		'statement|1': _Vcode.slice(0, 2),
		'remark': '@cparagraph',
		'originalprice': 0,
		'discount|50-100': 100,
		'price': function() {
			return this.originalprice * this.discount / 100
		},
		'addcount|80-100': 100,
		'pay|1': _Vcode.slice(0, 2),
		'addpay|1': _Vcode.slice(0, 2),
		'packageproject': [],
		'groupproject': []
	}]
})
Mock.mock('/management/organization', {
	'data|11': [{
		'name|+1': '@ctitle',
		'code|+1': _Vcode.slice(0),
		'shorthand': '@string',
		'nature|1': _Vcode.slice(0, 8),
		'contact': '@cname',
		'phone': '@id',
		'numberofpeople|50-500': 100,
		'bank': '@id',
		'address': '@county',
		'fax': '@id',
		'postcode': '@id',
		'pinyin': '@string',
		'wubi': '@string',
		'remark': '@cparagraph'
	}]
})
Mock.mock('/management/orgexamination', {
	'data|3': [{
		'code|+1': _Vcode.slice(0),
		'organization|1': _Vcode.slice(0, 11),
		'starttime': '@datetime',
		'endtime': '@datetime',
		'times|1-6': 1,
		'isover|1': _Vcode.slice(0, 2),
		'isprepare|1': _Vcode.slice(0, 2),
		'orggroup': []
	}]
})
Mock.mock('/management/returnvisit', {
	'data|16-30': [{
		'name|+1': '@cname',
		'code|+1': _Vcode.slice(0),
		'date': '@datetime',
		'registerid': '18012601',
		'idcard': '@id',
		'sex|1': _Vcode.slice(1, 3),
		'birthday': '@date',
		'age': function() {
			let r = this.birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r === null)	return ''
      return new Date().getFullYear() - r[1]
		},
		'phone': '@id',
		'visitdoctor': '@name',
		'visitdate': '@date',
		'isnotice|1': _Vcode.slice(0, 2),
		'noticeaccount': '@cname',
		'noticedate': '@date'
	}]
})

/* 医生工作台 */
Mock.mock('/doctor/gettester', {
	'data': {
		'name': '@cname',
		'code': '20180227001',
		'registerid': '18012601',
		'sex|1': _Vcode.slice(1, 3),
		'age|1-90': 18,
		'testtype': '健康体检',
		'imageUrl': '@dataImage'
	}
})
