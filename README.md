# ember-cli-deeplink-component

[![Code Climate](https://codeclimate.com/github/zakmac/ember-cli-deeplink-component/badges/gpa.svg)](https://codeclimate.com/github/zakmac/ember-cli-deeplink-component)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-deeplink-component.svg)](http://emberobserver.com/addons/ember-cli-deeplink-component)
[![Shields.io](https://img.shields.io/badge/tests-38%2F38-brightgreen.svg)](http://shields.io)

#### Table of Contents

- [Live Example](http://www.zakmac.com/ember-demos/deeplink-component) _- external link_
- <a href="#user-content-about">About</a>
- <a href="#user-content-installation">Installation</a>
- <a href="#user-content-properties">Properties</a>
- <a href="#user-content-examples">Example Code</a>
- <a href="#user-content-contributing-modifying">Contributing</a>

## About

<strong>ember-cli-deeplink-component</strong> provides a <code>{{deep-link}}</code> component in both inline and block form. The component allows for linking to in-page content in much the same way you could on a non single page application site using a plain anchor tag.

## Installation

```shell
cd /path/to/my-awesome-application
ember install ember-cli-deeplink-component
```

## Properties

**duration** `{number}`
- Duration of scroll event in milliseconds
  - Superseded by the `speed` property

**href (req.)** `{string}`
- The target anchor name or id of the target element

**mutable** `{boolean}`
- Whether scroll events can be interrupted by user interaction

**speed** `{number}`
- Speed in pixels per second for scroll events

**text** `{string}`
- Text content of the component
  - Superseded by content yielded via block syntax

## Examples

**Target an anchor using the inline syntax**
```handlebars
{{deep-link href="waldo" text="Where is waldo?"}}

{{! the target anchor}}
<a name="waldo"></a>
```

**Target an element by id using the block syntax**
```handlebars
{{#deep-link href="waldo"}}
  Where is waldo?
{{/deep-link}}

{{! the target element}}
<div id="waldo">
  Here he is.
</div>
```

## Contributing / Modifying

Clone the project and do what you want with it. If you do something neat and are feeling generous submit a PR [against the `feature` branch (GitHub)](https://github.com/zakmac/ember-cli-deeplink-component/tree/feature)**.**

```shell
cd /path/to/projects
git clone git@github.com:zakmac/ember-cli-deeplink-component.git
```

---
<small>
For more information on using **ember-cli**, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).<br>
For more information on **Ember.js**, visit [http://www.emberjs.com/](http://www.emberjs.com/).<br>
Looking for more great Ember addons? Check out [http://www.emberobserver.com/](http://www.emberobserver.com/).<br>
Check out the Ember.js IRC channel at `#emberjs` on **Freenode IRC** or join the [Ember Community Slack organization](https://ember-community-slackin.herokuapp.com/).
</small>
