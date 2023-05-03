package com.almostThere.domain.meeting.repository;

import com.almostThere.domain.meeting.entity.MeetingMember;
import com.almostThere.domain.meeting.entity.StateType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingMemberRepository extends JpaRepository<MeetingMember, Long> {
    @Modifying
    @Query("delete" +
            " from MeetingMember m " +
            "where m.member.id=:memberId " +
            "and m.meeting.id=:meetingId")
    void deleteMeetingMemberByMeetingIdAndMemberID(@Param("memberId") Long memberId, @Param("meetingId") Long meetingId);

    @Query("select m from MeetingMember m where m.member.id = :memberId")
    List<MeetingMember> findByMemberId(@Param("memberId") Long memberId);

    List<MeetingMember> findByMeetingIdAndState(@Param("meetingId") Long meetingId, @Param("state")StateType state);
    
    Optional<MeetingMember> findByMeeting_IdAndMember_Id(Long meetingId, Long memberId);
}
