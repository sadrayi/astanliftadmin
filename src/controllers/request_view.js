/*
کنترل شماره همراه یا قرارداد
دریافت اطلاعات آدرسی و نام فرد بر اساس شماره قرارداد
غیرفعال کردن فیلد نام و آدرس بر اساس انتخاب
ثبت مشرتی در صورت عدم
انتخاب تکنسین اتوکامپلیت
بستن آدرس سایر در صورت ورود شماره قرارداد


 */

exports.get = (req, res) => {
  res.render('requests/request_view', { csrfToken: req.csrfToken(),  activePage: { isAuthenticated:req.isAuthenticated(), request_view: true , title:'مشاهده درخواست'} });
};
