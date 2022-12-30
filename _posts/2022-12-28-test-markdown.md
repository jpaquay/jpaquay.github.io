---
layout: post
title: Open carefully. I'm mostly `harmless`
subtitle: The steps above are the bare minimum configuration
cover-img: /assets/img/logo.png
thumbnail-img: /assets/img/logo.jpg
share-img: /assets/img/logo.png
gh-repo: jpaquay/jpaquay.github.io/
gh-badge: [star, fork, follow]
tags: [test]
comments: true
---



{: .box-note}
Both menus are completely optional and can be commented out if not required. Use the template provided in the [file](/post/about) as a guide.

 If you now run `hugo server` you will be presented with a blank Congo.

### Last advice 

The `pageRef` parameter allows you to easily reference Hugo content pages and taxonomies. It is the quickest way to configure the menu as you can simply refer to any Hugo content item and it will automatically build the correct link. To link to external URLs, the `url` parameter can be used.

---

**Here's a useless table:**

| Number | Next number | Previous number |
| :------ |:--- | :--- |
| Five | Six | Four |
| Ten | Eleven | Nine |
| Seven | Eight | Six |
| Two | Three | One |


How about a nice seanery ?

![Drag logo](https://media.licdn.com/dms/image/C4D16AQHxCltYOOb2IA/profile-displaybackgroundimage-shrink_350_1400/0/1536654589750?e=1677715200&v=beta&t=V5lccx7BxlaBGJlYRY_u_BdpoxZPz3WFnvXtPRHSnWY)

It can also be centered!

![Crepe](https://media.licdn.com/dms/image/C4D16AQHxCltYOOb2IA/profile-displaybackgroundimage-shrink_350_1400/0/1536654589750?e=1677715200&v=beta&t=V5lccx7BxlaBGJlYRY_u_BdpoxZPz3WFnvXtPRHSnWY){: .mx-auto.d-block :}

Here's a code chunk:

~~~
var foo = function(x) {
  return(x + 5);
}
foo(3)
~~~

And here is the same code with syntax highlighting:

```javascript
var foo = function(x) {
  return(x + 5);
}
foo(3)
```

And here is the same code yet again but with line numbers:

{% highlight javascript linenos %}
var foo = function(x) {
  return(x + 5);
}
foo(3)
{% endhighlight %}

![Yellow Duck](img/logo.png 'Netdev')

## Boxes
You can add notification, warning and error boxes like this:

### Notification

{: .box-note}
**Note:** This is 

### Warning

{: .box-warning}
**Warning:**  not an

### Error

{: .box-error}
**Error:**  error box !