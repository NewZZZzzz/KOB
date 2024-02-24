package com.kob.matchingsystem.service.impl;

import com.kob.matchingsystem.service.MatchingService;
import com.kob.matchingsystem.service.impl.utils.MatchingPool;
import org.springframework.stereotype.Service;

@Service
public class MatchingServiceImpl implements MatchingService {
    public final static MatchingPool matchingPoll = new MatchingPool();

    @Override
    public String addPlayer(Integer userId, Integer rating, Integer botId) {
        System.out.println("add" + userId + rating);
        matchingPoll.addPlayer(userId, rating, botId);
        return "add success";
    }

    @Override
    public String removePlayer(Integer userId) {
        System.out.println("remove" + userId);
        matchingPoll.removePlayer(userId);
        return "remove success";
    }
}
