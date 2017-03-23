package com.test.dproject.officeassistant;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

/**
 * Created by Subhashinie on 3/23/2017.
 */
public class DrawPathView extends SurfaceView implements Runnable {
    Thread t = null;
    SurfaceHolder holder;
    Boolean working = false ;
    Bitmap robot;
    Bitmap map;
    float x,y;

    public DrawPathView(Context context) {
        super(context);
        map= BitmapFactory.decodeResource(getResources(),R.drawable.floorlayout);
        robot = BitmapFactory.decodeResource(getResources(),R.drawable.tiny_robot);
        x=y=0;
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
