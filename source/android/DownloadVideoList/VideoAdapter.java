/*
VideoAdapter 구현
Video class , item.xml , VideoActivity
 */

package com.mobileprogramming.twelve;

import android.content.Context;
import android.content.Intent;
import android.os.Parcelable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.Toast;

import com.mobileprogramming.twelve.R;

import java.util.ArrayList;

public class VideoAdapter extends BaseAdapter {  //BaseAdapter 추상 클래스 구체화

    public Context context;
    public ArrayList<Video>arrayVideo;  // listView 보일 arrayVideo
    public Intent intent_play;   //playActivity에 영상정보를 전달하기 위한 intent
    public Intent intent_info;

    LayoutInflater mLayoutInflater=null;    //item.xml을 VideoActivity의 Listview에 넣기 위한 layoutinflater

    public VideoAdapter(Context mContext, ArrayList<Video>array_videos){    //변수 초기화를 위한 생성자
        this.context=mContext;
        this.arrayVideo=array_videos;
        this.mLayoutInflater=LayoutInflater.from(mContext);
    }
    @Override
    public int getCount() { //video객체가 담겨있는 배열의 크기
        return arrayVideo.size();
    }
    @Override
    public Object getItem(int position) {
        return arrayVideo.get(position);
    } // position에 위치 해있는 video객체를 리턴하는 method

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) { //listView연결을 위한 핵심 method

        View view = mLayoutInflater.inflate(R.layout.video_item, null);
        intent_play=new Intent(context, playActivity.class);
        intent_info=new Intent(context, VideoInfo.class);
        Button button=(Button)view.findViewById(R.id.btn_item);
        button.setText(arrayVideo.get(position).getTitle()+"("+arrayVideo.get(position).getSizeToString_Mbyte()+"Mb)");
        button.setOnLongClickListener(new Button.OnLongClickListener(){
            @Override
            public boolean onLongClick(View v) {
                intent_info.putExtra("videoTitle", arrayVideo.get(position).getTitle()+".txt");
                context.startActivity(intent_info);
                return true;
            }
        });

        button.setOnClickListener(new Button.OnClickListener(){
            public void onClick(View v){    //특정 item 클릭시 해당 영상의 정보를 intent를 통해 playActivity로 전달
                intent_play.putExtra("videoTitle", arrayVideo.get(position).getTitle()+".avi"); //mp4파일 실행시 .mp4로 변경
                context.startActivity(intent_play);
            }
        });
        return view;
    }
}
