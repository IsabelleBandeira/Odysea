package com.globalsolution.odysea.controller;

import com.globalsolution.odysea.service.TrackingQueryService;
import com.globalsolution.odysea.dto.TrackingViewDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tracking")
public class TrackingQueryController {

    private final TrackingQueryService trackingQueryService;

    public TrackingQueryController(TrackingQueryService trackingQueryService) {
        this.trackingQueryService = trackingQueryService;
    }

    @GetMapping("/{entregaId}")
    public ResponseEntity<TrackingViewDTO> getTracking(@PathVariable Long entregaId) {

        TrackingViewDTO dto = trackingQueryService.getTrackingView(entregaId);

        return ResponseEntity.ok(dto);
    }
}