{# 继承 layout/default.swig 模版 #}
{% extends 'layout/default.swig' %}
{% block head %}
	<link rel="stylesheet" href="{{ config.cdn }}/libs/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="{{ config.develop }}/main.css">
{% endblock %}
{# 重写 main 模块 #}

{# 给 body 添加 class #}
{% block bodyClass %}container-fluid{%endblock%}

{% block main %}
	<div class="webtest">
		<div class="head row">
		  	<div class="col-md-12 col-xs-12 col-lg-12 col-sm-12 clearfix">
		  		<form class="form-horizontal pull-left" role="form">
				  	<div class="form-group" style="width: 400px; margin-right: 50px; margin-left: 20px;">
				    	<label class="sr-only">测试地址</label>
				    	{% set url = "http://192.168.1.227:8080/index_82c7ee8.html" %}
				    	<input id="url" type="text" value="{{ url }}" class="form-control" placeholder="测试地址">
				  	</div>
				</form>
		  		<button type="button" class="pull-left btn btn-primary" id="test-start" style="margin-right: 20px;">
		  			<span>开始测试</span>
		  		</button>
		  		<button type="button" class="pull-left btn btn-danger" id="test-stop" disabled style="margin-right: 20px;">
					<span>停止测试</span>
		  		</button>

		  	</div>
		</div>
		<div class="row">
			<div class="col-md-3 col-xs-3 col-lg-3">
		  		<table class="table table-bordered table-hover">
				  	<thead>
				  		<tr>
				  			<th>待测试的页面</th>
				  		</tr>
				  	</thead>
				</table>
		  	</div>
		  	<div class="col-md-9 col-xs-9 col-lg-9">
		  		<table class="table table-bordered table-hover">
				  	<thead>
				  		<tr>
				  			<th>测试日志</th>
				  		</tr>
				  	</thead>
				</table>
		  	</div>
		</div>
		<hr>
		<div class="wrap row">
			<div class="col-md-3 col-xs-3 col-lg-3" id="message">
				<div class="list-group"></div>
		  	</div>
		  	<div class="col-md-9 col-xs-9 col-lg-9" id="console">
		  		
		  		<ul class="list-group"></ul>
		  	</div>
		</div>
	</div>
{% endblock %}

{% block footer %}
	<script src="{{ config.cdn }}/js/require.js" data-main="{{ config.develop }}/main.js"></script>
{% endblock %}
