{# 继承 layout/default.swig 模版 #}
{% extends 'layout/default.swig' %}
{% block head %}
	<link rel="stylesheet" href="{{ config.cdn }}/libs/bootstrap/css/bootstrap.min.css">
{% endblock %}
{# 重写 main 模块 #}

{# 给 body 添加 class #}
{% block bodyClass %}container-fluid{%endblock%}

{% block main %}
	<div class="row" style="margin-top: 30px;">
	  	<div class="col-md-12 col-xs-12 col-lg-12 col-sm-12">
	  		<button type="button" class="btn btn-primary" id="test-start">
	  			<span>开始测试</span>
	  		</button>
	  		<button type="button" class="btn btn-danger" id="test-stop" disabled>
				<span>停止测试</span>
	  		</button>
	  	</div>
	  	<div class="col-md-6 col-xs-6 col-lg-6 col-sm-12" id="message">
	  		<table class="table table-bordered table-hover">
			  	<thead>
			  		<tr>
			  			<th>测试关键信息</th>
			  		</tr>
			  	</thead>
			</table>
	  	</div>
	  	<div class="col-md-6 col-xs-6 col-lg-6 col-sm-12" id="console">
	  		<table class="table table-bordered table-hover">
			  	<thead>
			  		<tr>
			  			<th>测试日志信息</th>
			  		</tr>
			  	</thead>
			</table>
	  	</div>
	</div>
{% endblock %}

{% block footer %}
	<script src="{{ config.cdn }}/js/require.js" data-main="{{ config.develop }}/main.js"></script>
{% endblock %}
