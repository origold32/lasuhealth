// details-modal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  Consultation,
  ConversationEntry,
  TestUpload,
} from "@/types/consultations";

export default function ConsultationDetailsModal({
  consultation,
}: {
  consultation: Consultation;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Consultation with {consultation.name}</DialogTitle>
        </DialogHeader>
        {consultation.conversation.map(
          (entry: ConversationEntry, idx: number) => (
            <div key={idx} className="space-y-3 mt-4">
              <p className="font-semibold text-[#344054]">{entry.title}</p>
              <p className="text-sm text-[#475367]">{entry.discussion}</p>

              {entry.doctorFeedback && (
                <>
                  <p className="font-semibold text-[#101928]">
                    Doctor&apos;s Feedback:
                  </p>
                  <p className="text-sm text-[#475367]">
                    {entry.doctorFeedback}
                  </p>
                </>
              )}

              {Array.isArray(entry.testUploads) &&
                entry.testUploads.length > 0 && (
                  <>
                    <p className="font-semibold text-[#101928]">
                      Test Reports:
                    </p>
                    <ul className="list-disc ml-5 text-sm text-[#475367]">
                      {entry.testUploads.map((file: TestUpload, i: number) => (
                        <li key={i}>
                          {"url" in file ? (
                            <a
                              href={file.url}
                              target="_blank"
                              className="text-[#1363DF] underline"
                            >
                              {file.fileName}
                            </a>
                          ) : (
                            <span>
                              {file.testName}: {file.result}{" "}
                              {file.unit && `(${file.unit})`} –{" "}
                              {file.interpretation}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
