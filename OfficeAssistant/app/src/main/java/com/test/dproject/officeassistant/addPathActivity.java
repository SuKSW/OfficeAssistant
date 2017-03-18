package com.test.dproject.officeassistant;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;

public class addPathActivity extends AppCompatActivity implements View.OnTouchListener {

    DrawingThePath v;
    Bitmap robot;
    Bitmap map;
    float x,y;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_path);
        v = new DrawingThePath(this);

        v.setOnTouchListener(this);
        map= BitmapFactory.decodeResource(getResources(),R.drawable.floorlayout);
        robot = BitmapFactory.decodeResource(getResources(),R.drawable.tiny_robot);
        x=y=0;
        setContentView(v);
    }

    @Override
    protected void onPause() {
        super.onPause();
        v.pause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        v.resume();
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        return false;
    }

    public class DrawingThePath extends SurfaceView implements Runnable {

        Thread t = null;
        SurfaceHolder holder;
        Boolean working = false ;

        public DrawingThePath(Context context) {
            super(context);
            holder = getHolder();
        }

        @Override
        protected void onDraw(Canvas canvas) {
            super.onDraw(canvas);
        }

        @Override
        public void run() {
            while(working){
                if(!holder.getSurface().isValid()){
                    continue;
                }
                Canvas c = holder.lockCanvas();
                c.drawBitmap(map,x,y,null);
                holder.unlockCanvasAndPost(c);
            }

        }
        public void pause(){
            working = false;
            while (true){
                try{
                    t.join();
                }catch (InterruptedException e){
                    e.printStackTrace();
                }
                break;
            }
            t = null;
        }
        public void resume(){
            working = true;
            t=new Thread(this);
            t.start();
        }
    }

}
