package com.ruption.ar;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.Manifest;

import com.google.ar.core.examples.java.common.samplerender.SampleRender;
import com.google.ar.core.examples.java.helloar.HelloArActivity;

public class RuptionARPlugin extends CordovaPlugin {

    private static final String	ACTION_CLOSE				= "close";

    private static final String	ACTION_STATE_ISOPEN			= "isOpen";

    private static final String	ACTION_ON_RESUME			= "onResume";

    private static final String	ACTION_ON_PAUSE				= "onPause";

    private static final String ACTION_REQUEST_ACCESS   = "requestAccess";

    private static final String	ACTION_OPEN					= "open";
    
    private String action;

    private HelloARRuption helloARRuption;

    private SampleRender render;

    private CallbackContext	openCallback = null;
    private CallbackContext requestAccessCallback = null;

    private boolean _locationPermissionRequestRequired      = false;
    private boolean _cameraPermissionGranted          		= false;

    private static final int CAMERA_PERMISSION_REQUEST_CODE = 1;
    private static final int REQUEST_ACCESS_REQUEST_CODE = 3;

    int width;
    int height;

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        this.action = action;

        if (RuptionARPlugin.ACTION_CLOSE.equals( action)) {
            if ( this.helloARRuption != null) {
                this.cordova.getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        removeHelloARActivity();
                    }
                });
                callbackContext.success( action + ": helloARRuption is present");
            }
            else {
                callbackContext.error( action + "helloARRuption is not present");
            }
            return true;
        }
        
        if ( RuptionARPlugin.ACTION_STATE_ISOPEN.equals( action)) {
            if (this.helloARRuption != null) {
                callbackContext.success( action + ": helloARRuption is present");
            }
            else {
                callbackContext.error( action + ": helloARRuption is not present");
            }
            return true;
        }

        if ( RuptionARPlugin.ACTION_ON_RESUME.equals( action)) {
            if (this.helloARRuption != null ) {
                this.cordova.getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        RuptionARPlugin.this.helloARRuption.onResume();
                        callbackContext.success( action + ":helloARRuption is present");
                    }
                });
            } else {
                callbackContext.error( action + ": helloARRuption is not present");
            }
            return true;
        }

        if ( RuptionARPlugin.ACTION_ON_PAUSE.equals( action)) {
            if ( helloARRuption != null) {
                this.cordova.getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        RuptionARPlugin.this.helloARRuption.onPause();
                    }
                });
                callbackContext.success( action + ": helloARRuption is present");
            } else {
                callbackContext.error(action + ": helloARRuption is not present");
            }
            return true;
        }

        if ( RuptionARPlugin.ACTION_REQUEST_ACCESS.equals(action))  {
            requestAccessCallback = callbackContext;
            JSONArray jsonArray = null;
            try {
                jsonArray = args.getJSONArray(0);
            } catch (JSONException e) {
            }
            boolean cameraPermissionRequestRequired = !cordova.hasPermission(Manifest.permission.CAMERA);
            _locationPermissionRequestRequired  = !cordova.hasPermission(Manifest.permission.ACCESS_FINE_LOCATION) && !cordova.hasPermission(Manifest.permission.ACCESS_COARSE_LOCATION);

            if(cameraPermissionRequestRequired && _locationPermissionRequestRequired) {
                _cameraPermissionGranted = false;
                this.cordova.requestPermissions(this, REQUEST_ACCESS_REQUEST_CODE, new String[] { Manifest.permission.CAMERA, Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION});
            } else if (cameraPermissionRequestRequired)  {
                this.cordova.requestPermissions(this, REQUEST_ACCESS_REQUEST_CODE, new String[] {Manifest.permission.CAMERA});
            } else if (_locationPermissionRequestRequired) {
                _cameraPermissionGranted = true;
                this.cordova.requestPermissions(this, REQUEST_ACCESS_REQUEST_CODE, new String[] {Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION});
            } else {
                callbackContext.success();
            }
            return true;
        }

        if (RuptionARPlugin.ACTION_OPEN.equals(action)) {
            this.openCallback = callbackContext;

            boolean cameraPermissionRequesrRequired = !cordova.hasPermission(Manifest.permission.CAMERA);
            _locationPermissionRequestRequired = !cordova.hasPermission(Manifest.permission.ACCESS_FINE_LOCATION) && !cordova.hasPermission(Manifest.permission.ACCESS_COARSE_LOCATION);

            if(cameraPermissionRequesrRequired && _locationPermissionRequestRequired) {
                _cameraPermissionGranted = false;
                this.cordova.requestPermissions(this, CAMERA_PERMISSION_REQUEST_CODE, new String[] {Manifest.permission.CAMERA, Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION} );
            } else if (cameraPermissionRequesrRequired) {
                this.cordova.requestPermissions(this, CAMERA_PERMISSION_REQUEST_CODE, new String[] {Manifest.permission.CAMERA});
            } else if (_locationPermissionRequestRequired) {
                _cameraPermissionGranted = true;
                this.cordova.requestPermissions(this, CAMERA_PERMISSION_REQUEST_CODE, new String[] {Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION});
            } else {
                RuptionARPlugin.this.helloARRuption.onSurfaceCreated(render);
                RuptionARPlugin.this.helloARRuption.onSurfaceChanged(render, width, height);
                RuptionARPlugin.this.helloARRuption.onDrawFrame(render); */
                callbackContext.success("This ended up right");
            }
            return true;
        }

        if (action.equals("echo")) {
            String message = "test message";
            this.echo(message, callbackContext);
            return true;
        }


        callbackContext.sendPluginResult( new PluginResult(PluginResult.Status.ERROR, "no such action: " + action));
        return false;
    }

    private void echo(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error(message + "!");
        }
    }

    protected static class  HelloARRuption extends HelloArActivity {

       @Override
        public void onWindowFocusChanged(boolean hasFocus) {
           super.onWindowFocusChanged(hasFocus);

           if(!hasFocus) {
               this.getCurrentFocus();
           }
       }

       @Override
        protected void onResume() {
           super.onResume();
       }
    }

    private boolean removeHelloARActivity() {
        if ( this.helloARRuption != null ) {
            this.helloARRuption.onPause();
            return true;
        }
        return false;
    }
}
