 "use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [phone,setPhone]=useState(""); const [otp,setOtp]=useState("");
  const [mode,setMode]=useState<"google"|"phone">("google");
  const [sent,setSent]=useState(false); const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
  async function google(){try{setBusy(true);const {error}=await supabase().auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+"/gallery"}});if(error)throw error;}catch(e:any){setMessage(e.message);setBusy(false);}}
  async function sendOtp(){try{setBusy(true);const {error}=await supabase().auth.signInWithOtp({phone});if(error)throw error;setSent(true);setMessage("OTP পাঠানো হয়েছে।");}catch(e:any){setMessage(e.message);}finally{setBusy(false);}}
  async function verifyOtp(){try{setBusy(true);const {error}=await supabase().auth.verifyOtp({phone,token:otp,type:"sms"});if(error)throw error;location.href="/gallery";}catch(e:any){setMessage(e.message);setBusy(false);}}
  return <main className="auth-page"><div className="auth-card"><Link href="/" className="back-link">← মূল পাতায় ফিরুন</Link><div className="auth-emblem">ن</div><div className="eyebrow centered">PRIVATE DIGITAL ARCHIVE</div><h1>স্বাগতম</h1><p className="auth-desc">সংগ্রহশালা দেখতে আপনার অ্যাকাউন্ট দিয়ে প্রবেশ করুন।</p>
    <div className="auth-tabs"><button className={mode==="google"?"active":""} onClick={()=>setMode("google")}>Google</button><button className={mode==="phone"?"active":""} onClick={()=>setMode("phone")}>ফোন নম্বর</button></div>
    {mode==="google"? <button className="button google-button" onClick={google} disabled={busy}>G &nbsp; Google দিয়ে প্রবেশ করুন</button>:<><label>ফোন নম্বর (দেশের কোডসহ)</label><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+8801XXXXXXXXX"/>{sent&&<><label>SMS OTP</label><input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="৬ সংখ্যার কোড"/></>}<button className="button button-gold full" onClick={sent?verifyOtp:sendOtp} disabled={busy||!phone||(sent&&otp.length<4)}>{sent?"OTP যাচাই করুন":"OTP পাঠান"}</button></>}
    {message&&<p className="form-message">{message}</p>}<p className="privacy-note">আপনার প্রবেশের তথ্য নিরাপদভাবে ব্যবহৃত হবে। এখানে কোনো পাবলিক পোস্ট, লাইক বা কমেন্টের ব্যবস্থা নেই।</p>
  </div></main>;
}
