package com.test.dproject.officeassistant;


import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.HorizontalScrollView;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.ScrollView;

public class addPathActivity extends AppCompatActivity implements View.OnTouchListener {

    DrawPathView v;


    private ImageButton scrollLeftBtn;
    private ImageButton scrollRightBtn;
    private ImageButton scrollUpBtn;
    private ImageButton scrollDownBtn;
    private HorizontalScrollView hsv;
    private ScrollView vsv;
    private RelativeLayout mapLayout;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_path);

        hsv = (HorizontalScrollView) findViewById(R.id.horizontal_scrollview);
        vsv = (ScrollView) findViewById(R.id.vertical_scrollview);
        mapLayout = (RelativeLayout) findViewById(R.id.map_layout);

        v = new DrawPathView(this);
        v.setLayoutParams(new ViewGroup.LayoutParams(800,800));
        mapLayout.addView(v);

        scrollLeftBtn = (ImageButton) findViewById(R.id.btn_scroll_left);
        scrollRightBtn = (ImageButton) findViewById(R.id.btn_scroll_right);
        scrollUpBtn = (ImageButton) findViewById(R.id.btn_scroll_up);
        scrollDownBtn = (ImageButton) findViewById(R.id.btn_scroll_down);


        scrollRightBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                hsv.scrollTo((int)hsv.getScrollX() + 30, (int)hsv.getScrollY());
            }
        });

        scrollLeftBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                hsv.scrollTo((int)hsv.getScrollX() - 30, (int)hsv.getScrollY());
            }
        });

        scrollUpBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                vsv.scrollTo((int)vsv.getScrollX(), (int)vsv.getScrollY() -30);
            }
        });

        scrollDownBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                vsv.scrollTo((int)vsv.getScrollX(), (int)vsv.getScrollY() +30);
            }
        });




        v.setOnTouchListener(this);



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





}
