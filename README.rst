Duckface v1.0.0 |travis-status| |coveralls-status|
=====

    Javascript interfaces by duck typing!

.. contents:: Table of Contents

Installation
-----

Use `Bower`_ to install **Duckface** into your project:

.. code:: console

    $ bower install duckface

Browsers
....

.. code:: html

    <script src="path/to/duckface.js"></script>

Browsers (using `RequireJS`_)
....

.. code:: javascript

    require(['duckface']);

NodeJS
....

First install it as an NPM module:

.. code:: console

    $ npm install duckface

Then use it in your project:

.. code:: javascript

    var Duckface = require('duckface');


Usage
----

Define a **Duckface** without arguments checking:

.. code:: javascript

    var ApiDriver = new Duckface('ApiDriver', ['fetchItems', 'addItem']);

This will define a Duckface, with only a list of methods that should be implemented. How the methods are implemented is left to the implementing object.

Define a **Duckface** with strict arguments checking:

.. code:: javascript

    var ApiDriver = new Duckface('ApiDriver', {
        fetchItems : function(page) {},
        addItem : function(title, content, author) {}
    });

This will define a Duckface, with dummy methods on an object. The arguments of the dummy methods are strictly checked in the implementing object to ensure the defined contract is upheld.

Check if an object implements correct interface:

.. code:: javascript

    function Raffler(driver)
    {
        Duckface.ensureImplements(driver, ApiDriver);
    }

Contributing
----

Workflow
.....

1. Create an issue in the issue tracker of this repository
2. Fork this repository into your own account
3. Implement your bugfix/feature/... in a separate branch
    a. If it's a feature, use ``feature/`` prefix for you branch, followed by the issue number in the tracker. E.g. ``feature/#9``
    b. If it's not a feature, use ``issue/`` prefix for your branch, followed by the issue number in the tracker. E.g. ``issue/#12``
4. Create additional unit tests, or update existing ones
5. Do a merge request back to this repository and wait for your PR to be accepted/declined

Unit testing
.....

We aim to keep **Duckface** code coverage in unit tests as close to 100% as possible. When contributing to **Duckface** you are strongly encouraged to keep the current code coverage from regressing.

`Mocha`_ is used as the unit testing framework. Install it using `NPM`_:

.. code:: console

    $ npm install

This will install required `NodeJS`_ modules.

To run the tests, perform from the project root:

.. code:: console

    $ make test


.. _Bower: http://bower.io/
.. _RequireJS: http://www.requirejs.org/
.. _TravisCI: http://travis-ci.org/
.. _Mocha: http://mochajs.org/
.. _NodeJS: http://nodejs.org/
.. _NPM: https://www.npmjs.com/


.. |travis-status| image:: https://travis-ci.org/OpenRaffler/duckface.js.svg?branch=master
    :target: https://travis-ci.org/OpenRaffler/duckface.js

.. |coveralls-status| image:: https://coveralls.io/repos/OpenRaffler/duckface.js/badge.svg
    :target: https://coveralls.io/r/OpenRaffler/duckface.js
