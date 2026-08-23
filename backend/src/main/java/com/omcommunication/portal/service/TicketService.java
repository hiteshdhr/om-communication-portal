package com.omcommunication.portal.service;

import com.omcommunication.portal.model.Ticket;
import com.omcommunication.portal.repository.TicketRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    private String generateTicketNumber() {
        int num = 1000 + new Random().nextInt(90000);
        return "OM-TICK-" + num;
    }

    public Ticket createTicket(Ticket ticket) {
        ticket.setTicketNumber(generateTicketNumber());
        ticket.setStatus(Ticket.Status.OPEN);
        return ticketRepository.save(ticket);
    }

    public Ticket getByTicketNumber(String ticketNumber) {
        return ticketRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new RuntimeException("Ticket not found: " + ticketNumber));
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Ticket updateTicket(UUID id, Ticket updates) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found: " + id));
        if (updates.getStatus() != null) ticket.setStatus(updates.getStatus());
        if (updates.getPriority() != null) ticket.setPriority(updates.getPriority());
        if (updates.getAssignedTechnician() != null) ticket.setAssignedTechnician(updates.getAssignedTechnician());
        return ticketRepository.save(ticket);
    }

    public long countByStatus(Ticket.Status status) {
        return ticketRepository.findAll().stream()
                .filter(t -> t.getStatus() == status)
                .count();
    }

    public void deleteTicket(UUID id) {
        if (!ticketRepository.existsById(id)) {
            throw new RuntimeException("Ticket not found: " + id);
        }
        ticketRepository.deleteById(id);
    }
}
