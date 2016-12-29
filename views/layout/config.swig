{# 我是配置文件 #}

{% set config = {
	"cdn"       : "http://cdn.svon.org",
	"hostname"  : "",
	"encoding"  : "utf-8"
} %}

{% set config['develop'] = config.hostname + "/develop" %}