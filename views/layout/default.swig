<!DOCTYPE html>
<html lang="en">
{# 导入网站配置信息 #}
{% include "./config.swig" %}
<head>
	{# 标题模块 #}
	{% block title %}
		<title>
			{{ title }}   {# 网站标题 #}
	  		{% if tags %} {# 分类标签 #}
	  			- {{ tags }}
	  		{% endif %}
			{% if page%}  {# 内容页面标题 #}
				- {{ page.title }}
			{% endif %}
		</title>
	{% endblock %}
	{# 导入头部配置信息 #}
	{% include "./head.swig" %}
	<script>
		var config = {
			"baseUrl" : "{{ config.develop }}/",
			"paths" : {
	            "$" : "{{ config.cdn }}/libs/jquery.min",
	            "io" : "/socket.io/socket.io"
	        },
	        "shim": {
	            "$" : {
	                "deps" : [],
	                "exports" : "window.jQuery"
	            }
	    　　}
		}
	</script>
	{% block head %}
  		{# 我是头部追加的内容 #}
	{% endblock %}
</head>
<body class="{% block bodyClass %}{%endblock%}">
	{% block header %}
  		{# 我是头部内容 #}
	{% endblock %}
	{% block main %}
  		{# 我是中间部分内容 #}
	{% endblock %}

	{% block footer %}
  		{# 我是尾部内容 #}
	{% endblock %}
</body>
</html>