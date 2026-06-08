package com.globalsolution.odysea.controller;

import com.globalsolution.odysea.dto.TrackingUpdateDTO;
import com.globalsolution.odysea.service.TrackingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tracking")
public class TrackingController {

    private final TrackingService trackingService;

    public TrackingController(TrackingService trackingService) {
        this.trackingService = trackingService;
    }

    @PostMapping("/events")
    public ResponseEntity<Void> receiveTrackingUpdate(
            @RequestBody TrackingUpdateDTO dto) {

        trackingService.processTrackingUpdate(dto);

        return ResponseEntity.ok().build();
    }
}