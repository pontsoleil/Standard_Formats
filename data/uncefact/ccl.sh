# UniqueID Kind DictionaryEntryName Definition ObjectClassTerm PropertyTerm RepresentationTerm AssociatedObjectClass BusinessTerm UsageRule OccurrenceMin OccurrenceMax ShortName
# $1       $2   $3                  $4         $5              $6           $7                 $8                    $9           $10       $11           $12           $13            
awk -F'\t' '{
  if ($2=="ACC") {
    # UniqueID Kind DictionaryEntryName ObjectClassTerm Definition
    # $1       $2   $3                  $5              $4
    gsub("\"\"","\\\""); 
    print $1"\t"$2"\t"$3"\t"$5"\t"$4
  }
}' ccl_20a_cc.txt > ccl_20a_cc_acc.tsv

awk -F'\t' 'BEGIN { acc=""; }
{ gsub("\"\"","\\\""); 
  if ($2=="ACC") {
    acc=$1;
  } else if ($2=="BCC" || $2=="ASCC") {
    # UniqueID Kind ShortName ParentID ObjectClassTerm OccurrenceMin OccurrenceMax Definition PropertyTerm RepresentationTerm AssociatedObjectClass BusinessTerm UsageRule
    # $1       $2   $13       acc      $5              $11           $12           $4         $6           $7                 $8                    $9           $10            
    print $1"\t"$2"\t"$13"\t"acc"\t"$5"\t"$11"\t"$12"\t"$4"\t"$6"\t"$7"\t"$8"\t"$9"\t"$10            
  }
}' ccl_20a_cc.txt > ccl_20a_cc.tsv

# UniqueID Kind DictionaryEntryName Definition ObjectClassTerm PropertyTerm RepresentationTerm SequenceNumber
# $1       $2   $3                  $4         $5              $6           $7                 $8
awk -F'\t' '{
  if ($2=="DT") {
    # UniqueID Kind DictionaryEntryName RepresentationTerm
    # $1       $2   $3                  $7
    gsub("\"\"","\\\"");
    print $1"\t"$2"\t"$3"\t"$7
  }
}' ccl_20a_udt.txt > ccl_20a_udt.tsv

awk -F'\t' 'BEGIN { dt=""; }
{ gsub("\"\"","\\\""); 
  if ($2=="DT") {
    dt=$3;
  } 
  if ($2=="DT" || $2=="CC" || $2=="SC") {
    # DataType Kind SequenceNumber DictionaryEntryName Definition ObjectClassTerm PropertyTerm RepresentationTerm
    # dt       $2   $8             $3                  $4         $5              $6           $7
    print dt"\t"$2"\t"$8 "\t"$3"\t"$4"\t"$5"\t"$6"\t"$7          
  }
}' ccl_20a_udt.txt > ccl_20a_udt_compt.tsv

# UniqueID Kind DictionaryEntryName ShortName Definition Publicationcomments ObjectClassTermQualifier ObjectClassTerm
# $1       $2   $3                  $4        $5         $6                  $7                       $8
#  BusinessProcess Product Industry RegionGeopolitical OfficialConstraints Role SupportingRole SystemConstraints Example
#  $21             $22     $23      $24                $25                 $26                 $27               $28
awk -F'\t' '{
  if ($2=="ABIE") {
    # UniqueID Kind DictionaryEntryName ShortName Definition Publicationcomments ObjectClassTermQualifier ObjectClassTerm
    # $1       $2   $3                  $4        $5         $6                  $7                       $8
    #  BusinessProcess Product Industry RegionGeopolitical OfficialConstraints Role SupportingRole SystemConstraints Example
    #  $21             $22     $23      $24                $25                 $26                 $27               $28
    gsub("\"\"","\\\"");
    print $1"\t"$2"\t"$3"\t"$4"\t"$5"\t"$6"\t"$7"\t"$8"\t"$21"\t"$22"\t"$23"\t"$24"\t"$25"\t"$26
  }
}' ccl_20a_mbie.txt > ccl_20a_mbie.tsv

# UniqueID Kind DictionaryEntryName ShortName Definition Publicationcomments ObjectClassTermQualifier ObjectClassTerm
#  PropertyTermQualifier PropertyTerm DatatypeQualifier RepresentationTerm QualifiedDataTypeUID AssociatedObjectClassTermQualifier AssociatedObjectClass
#  BusinessTerm UsageRule SequenceNumber OccurrenceMin OccurrenceMax
#  BusinessProcess Product Industry Region(Geopolitical) OfficialConstraints Role SupportingRole SystemConstraints Example
#  BIE_CC_DTVersion RefLibraryVersion SubmitterName RefComponentUNID RefCRID UniquesubmitterID
#  CRStatusDate CRStatus LibraryMaintenanceComment TDED

# UniqueID Kind DictionaryEntryName ShortName Definition Publicationcomments ObjectClassTermQualifier ObjectClassTerm
# $1       $2   $3                  $4        $5         $6                  $7                       $8
#  PropertyTermQualifier PropertyTerm DatatypeQualifier RepresentationTerm QualifiedDataTypeUID AssociatedObjectClassTermQualifier AssociatedObjectClass
#  $9                    $10          $11               $12                $13                  $14                                $15
#  BusinessTerm UsageRule SequenceNumber OccurrenceMin OccurrenceMax
#  $16          $17       $18            $19           $20
#  BusinessProcess Product Industry RegionGeopolitical OfficialConstraints Role SupportingRole SystemConstraints Example
#  $21             $22     $23      $24                $25                 $26  $27            $28               $29
#  BIE_CC_DTVersion RefLibraryVersion SubmitterName RefComponentUNID RefCRID UniquesubmitterID
#  CRStatusDate CRStatus LibraryMaintenanceComment TDED
awk -F'\t' '{ gsub("\"\"","\\\"");
  if ($2=="BBIE" || $2=="ASBIE") {
    # UniqueID Kind ObjectClassTermQualifier ObjectClassTerm DictionaryEntryName ShortName Definition Publicationcomments 
    # $1       $2   $7                       $8              $3                  $4        $5         $6                  
    #  PropertyTermQualifier PropertyTerm DatatypeQualifier RepresentationTerm QualifiedDataTypeUID AssociatedObjectClassTermQualifier AssociatedObjectClass
    #  $9                    $10          $11               $12                $13                  $14                                $15
    #  BusinessTerm UsageRule SequenceNumber OccurrenceMin OccurrenceMax
    #  $16          $17       $18            $19           $20
    #  BusinessProcess Product Industry RegionGeopolitical OfficialConstraints Role SupportingRole SystemConstraints Example
    #  $21             $22     $23      $24                $25                 $26  $27            $28               $29
    print $1"\t"$2"\t"$7"\t"$8"\t"$3"\t"$4"\t"$5"\t"$6"\t"$9"\t"$10"\t"$11"\t"$12"\t"$13"\t"$14"\t"$15"\t"$16"\t"$17"\t"$18"\t"$19"\t"$20"\t"$21"\t"$22"\t"$23"\t"$24"\t"$25"\t"$26"\t"$27"\t"$28"\t"$29        
  }
}' ccl_20a_mbie.txt > ccl_20a_mbie_compt.tsv

awk -F'\t' '{ gsub("\"\"","\\\"");
  if ($2=="DT") {
    unid=$1;
  }
  if ($2=="DT" || $2=="CC" || $2=="SC") {
    # unid UniqueID Kind DictionaryEntryName Definition ObjectClassTermQualifier ObjectClassTerm PropertyTerm DatatypeQualifier
    #      $1       $2   $3                  $4         $5                       $6              $7           $8
    #  RepresentationTerm OccurrenceMin OccurrenceMax Enumeration RestrictionValue RefCRID
    #  $9                 $10           $11           $12         $13              $14
    print unid"\t"$1"\t"$2"\t"$3"\t"$4"\t"$5"\t"$6"\t"$7"\t"$8"\t"$9"\t"$10"\t"$11"\t"$12"\t"$13"\t"$14
  }
}' ccl_20a_mqdt.txt > ccl_20a_mqdt_compt.tsv