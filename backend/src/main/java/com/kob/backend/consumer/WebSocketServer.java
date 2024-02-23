package com.kob.backend.consumer;

import com.alibaba.fastjson2.JSONObject;
import com.kob.backend.consumer.utils.Game;
import com.kob.backend.consumer.utils.JwtAuthentication;
import com.kob.backend.mapper.RecordMapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/websocket/{token}")  // 注意不要以'/'结尾
public class WebSocketServer {
    public static ConcurrentHashMap<Integer, WebSocketServer> users = new ConcurrentHashMap<>();
    private static UserMapper userMapper;
    public static RecordMapper recordMapper;
    private final static CopyOnWriteArraySet<User> matchPool = new CopyOnWriteArraySet<>();

    private Game game = null;
    private Session session = null;
    private User user;

    @Autowired
    public void setUserMapper(UserMapper userMapper) {
        WebSocketServer.userMapper = userMapper;
    }
    @Autowired
    public void setRecordMapper(RecordMapper recordMapper) { WebSocketServer.recordMapper = recordMapper; }
    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token) throws IOException {
        this.session = session;
        System.out.println("connected!");
        Integer userId = JwtAuthentication.getUserId(token);
        this.user = userMapper.selectById(userId);

        if(this.user != null) {
            users.put(userId, this);

        } else {
            this.session.close();
        }

        System.out.println(users);
    }

    @OnClose
    public void onClose() {
        System.out.println("disconnected!");
        if(this.user != null) {
            users.remove(this.user.getId());
            matchPool.remove(this.user);
        }
        // 关闭链接
    }

    private void startMatching() {
        System.out.println("start");
        matchPool.add(this.user);

        while (matchPool.size() >= 2) {
            Iterator<User> it = matchPool.iterator();
            User a = it.next(), b = it.next();
            matchPool.remove(a);
            matchPool.remove(b);

            Game game = new Game(13, 14, 20, a.getId(), b.getId());
            game.createMap();
            game.start();

            users.get(a.getId()).game = game;
            users.get(b.getId()).game = game;

            JSONObject respGame = new JSONObject();
            respGame.put("a_id", game.getPlayerA().getId());
            respGame.put("a_sx", game.getPlayerA().getSx());
            respGame.put("a_sy", game.getPlayerA().getSy());
            respGame.put("b_id", game.getPlayerB().getId());
            respGame.put("b_sx", game.getPlayerB().getSx());
            respGame.put("b_sy", game.getPlayerB().getSy());
            respGame.put("map", game.getG());


            JSONObject respA = new JSONObject();
            respA.put("event", "start_matching");
            respA.put("opponent_username", b.getUsername());
            respA.put("opponent_photo", b.getPhoto());
            respA.put("game", respGame);
            users.get(a.getId()).sendMessage(respA.toJSONString());

            JSONObject respB = new JSONObject();
            respB.put("event", "start_matching");
            respB.put("opponent_username", a.getUsername());
            respB.put("opponent_photo", a.getPhoto());
            respB.put("game", respGame);
            users.get(b.getId()).sendMessage(respB.toJSONString());
        }
    }
    private void stopMatching() {
        System.out.println("stop");
        matchPool.remove(this.user);
    }

    private void move(int direction) {
        if(game.getPlayerA().getId().equals(user.getId())) {
            game.setNextStepA(direction);
        } else if (game.getPlayerB().getId().equals(user.getId())) {
            game.setNextStepB(direction);
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("received!");
        JSONObject data = JSONObject.parseObject(message);
        String event = data.getString("event");
        if ("start_matching".equals(event)) {
            startMatching();
        } else if ("stop_matching".equals(event)){
            stopMatching();
        } else if ("move".equals(event)) {
            move(data.getInteger("direction"));
        }
        // 从Client接收消息
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }


    public void sendMessage(String message){
        synchronized (this.session) {
            try {
                this.session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}