/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        var positionElement = parentElement.querySelector("#position");
        var accelElement = parentElement.querySelector("#accel");

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        function onSuccess(position) {
            positionElement.innerHTML = 'Latitude: ' + position.coords.latitude + '<br/>' +
                'Longitude: ' + position.coords.longitude + "<br/> Timestamp: " + position.timestamp + '\n';
        };

        function processEvent(event) {
            console.log(event);

            var x = event.accelerationIncludingGravity.x, y = event.accelerationIncludingGravity.y, z = event.accelerationIncludingGravity.z;

            accelElement.innerHTML = "x : " + x + "<br />";
            accelElement.innerHTML += "y: " + y + "<br />";
            accelElement.innerHTML += "z: " + z + "<br />";

        }

        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 30000 });

        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", processEvent, true);
        }


        console.log('Received Event: ' + id);
    }
};
