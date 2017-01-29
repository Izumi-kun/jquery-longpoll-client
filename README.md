# jQuery LongPoll client script

Simple client-side longpoll implementation.

## Usage

### Create

```javascript
var config = {
  url: '/url/to/polling',
  params: {t: 1485714246},
  callback: function (data) {
    // your callback function
    console.log(data);
  }
};
jQuery.longpoll.register('myId', config).start();
```

The server should return JSON data in follow structure:

```json
{
  "params": {"t": 1485714250}, 
  "data": "any kind of data will be passed to callback function"
}
```

### Stop

```javascript
jQuery.longpoll.get('myId').stop();
```

### Destroy

```javascript
jQuery.longpoll.destroy('myId');
```

License
-------
BSD-3-Clause
