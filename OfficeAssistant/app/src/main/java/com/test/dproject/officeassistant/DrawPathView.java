package com.test.dproject.officeassistant;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.util.AttributeSet;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.Window;

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
    Canvas c1;

    public DrawPathView(Context context) {
        super(context);
        map= BitmapFactory.decodeResource(getResources(),R.drawable.floorlayout);
        //map = Bitmap.createScaledBitmap(map, 100,100,true);
        robot = BitmapFactory.decodeResource(getResources(),R.drawable.tiny_robot);
        x=y=0;
        holder = getHolder();
        //Canvas c = new Canvas();//holder.lockCanvas();
        //c.drawBitmap(map,x,y,null);
        //holder.unlockCanvasAndPost(c);
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
            Canvas c2 = holder.lockCanvas();
            //c2.drawBitmap(map,x,y,null);

            c2.drawBitmap(robot,x,y,null);
            holder.unlockCanvasAndPost(c2);
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
