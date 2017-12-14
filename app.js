var koa = require('koa')
var controller = require('koa-route')
var app = koa()
var views = require('co-views')
var render = views('./view', {
    map: {html : 'ejs'}
})
var koa_static = require('koa-static-server')
var service = require('./service/webAppService.js')

var qs = require('querystring')


app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}))

app.use(controller.get('/route_test', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = 'Hello koa!'
}))

app.use(controller.get('/ejs_test', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = yield render('test', {title: 'title_test'})
}))

app.use(controller.get('/api_test', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = service.get_test_data()
}))

// 页面路由
// home 页
app.use(controller.get('/', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = yield render('index', { title: '书城首页' })
}))

// rank 页
app.use(controller.get('/rank', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = yield render('rank', { title: '排序页面' })
}))

// search 页
app.use(controller.get('/search', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = yield render('search', { title: '搜索页面' })
}))

// category 页
app.use(controller.get('/category', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = yield render('category', { title: '分类页面' })
}))

// male 页
app.use(controller.get('/male', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = yield render('male', { title: '男频页面' })
}))

//female 页
app.use(controller.get('/female', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = yield render('female', { title: '女频页面' })
}))

//book 页
app.use(controller.get('/book', function* () {
    this.set('Cache_Control', 'no-cache')
    var params = qs.parse(this.req._parsedUrl.query)
    var id = params.id
    this.body = yield render('book', { id: id })
}))


// 数据api路由
// home
app.use(controller.get('/ajax/index', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = service.get_index_data()
}))

// rank
app.use(controller.get('/ajax/rank', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = service.get_rank_data()
}))

// category
app.use(controller.get('/ajax/category', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = service.get_category_data()
}))

// bookbacket
app.use(controller.get('/ajax/bookbacket', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = service.get_bookbacket_data()
}))

// male
app.use(controller.get('/ajax/male', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = service.get_male_data()
}))

// female
app.use(controller.get('/ajax/female', function* () {
    this.set('Cache_Control', 'no-cache')
    this.body = service.get_female_data()
}))




// book
app.use(controller.get('/ajax/book', function* () {
    this.set('Cache_Control', 'no-cache')
    var params = qs.parse(this.req._parsedUrl.query)
    var id = params.id
    if(!id) {
        id = ''
    }
    this.body = service.get_book_data(id)
}))

// search，异步请求 yield
app.use(controller.get('/ajax/search', function* () {
    this.set('Cache_Control', 'no-cache')
    var params = qs.parse(this.req._parsedUrl.query)
    var start = params.start
    var end = params.end
    var keyword = params.keyword
    console.log(keyword);
    this.body = yield service.get_search_data(start, end, keyword)
}))





app.listen(3000)
console.log('koa server is started');