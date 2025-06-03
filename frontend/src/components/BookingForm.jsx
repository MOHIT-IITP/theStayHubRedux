import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleBooking } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingForm = () => {
    const {id} =  useParams();
    const dispatch = useDispatch();
    const place = useSelector((state) => state.place.place)

    const [formData, setFormData] = useState({
        owner: "",
        title: "",
        checkIn: "",
        checkOut: "",
        name: "",
        phone: "",
        price: "",
    });

    // Sync formData.title with place.title
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            owner: place?.owner || "",
            title: place?.title || "",
        }));
    }, [place?.title]);

    // Calculate price based on date difference
    useEffect(() => {
        if (formData.checkIn && formData.checkOut && place.price) {
            const checkInDate = new Date(formData.checkIn);
            const checkOutDate = new Date(formData.checkOut);
            const diffTime = checkOutDate - checkInDate;
            const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
            setFormData((prev) => ({
                ...prev,
                price: diffDays * place.price
            }));
        } else if (place.price) {
            setFormData((prev) => ({ ...prev, price: place.price }));
        }
    }, [formData.checkIn, formData.checkOut, place.price]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.checkIn || !formData.checkOut || !formData.name || !formData.phone)
            return toast.error("All fields are required");
        if (!formData.checkIn.trim()) return toast.error("Check-in is required");
        if (!formData.checkOut.trim()) return toast.error("Check-out is required");
        // Validate that check-in is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
        if (checkInDate < today){
            toast.error("Check-in date cannot be in the past");
            return false;
        } 
        // Validate that check-out is after check-in
        if (checkOutDate < checkInDate){
            toast.error("Check-out must be after check-in");
            return false;
        }
        if (!formData.name.trim()) return toast.error("Name is required");
        if (!formData.phone.trim()) return toast.error("Phone is required");
        return true;
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(handleBooking({ placeid: id, formData }));
            setFormData({
                title: place.title || "",
                checkIn: "",
                checkOut: "",
                name: "",
                phone: "",
                price: "",
            });
            navigate("/");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white/70 backdrop-blur-lg border border-violet-100 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-violet-800 mb-6 text-center">Book Your Stay</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                       Hotel Name 
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        readOnly
                        className="w-full px-4 py-2 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-300 outline-none bg-gray-100 cursor-not-allowed"
                        required
                        placeholder="Place title"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                        Check-In
                    </label>
                    <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="w-full px-4 text-sm py-2 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-300 outline-none"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                        Check-Out
                    </label>
                    <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-sm border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-300 outline-none"
                        required
                    />
                </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-300 outline-none"
                        required
                        placeholder="Your full name"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-300 outline-none"
                        required
                        placeholder="Your phone number"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price (in $)
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={String(formData.price)}
                        readOnly
                        className="w-full px-4 py-2 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-300 outline-none bg-gray-100 cursor-not-allowed"
                        required
                        placeholder="Total price"
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    className="
                        w-full py-3 mt-4
                        bg-gradient-to-tr from-blue-500 via-violet-500 to-blue-700
                        text-white text-lg font-semibold
                        rounded-xl shadow-lg
                        hover:from-blue-600 hover:via-violet-600 hover:to-blue-800
                        hover:scale-105 transition-all duration-200
                        focus:outline-none focus:ring-4 focus:ring-violet-300/50
                        active:scale-95
                    "
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
